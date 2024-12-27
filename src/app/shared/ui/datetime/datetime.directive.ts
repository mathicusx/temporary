import {
  Directive,
  OnInit,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  Host,
  ElementRef,
} from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { Components, DatetimePresentation } from '@ionic/core';
import { isBefore, isEqual, addDays } from 'date-fns';
import { takeUntil } from 'rxjs';
import {
  BooleanInput,
  coerceBooleanProperty,
} from 'src/common/coercion/boolean-propert';
import { mixinCanBeDestroyed } from 'src/common/mixins/can-be-destroyed';

/**
 * `date-fns` compatible date format enums
 */
export enum DateFormat {
  Year = 'yyyy',
  Month = 'MM',
  YearAndMonth = 'yyyy-MM',
  Date = 'yyyy-MM-dd',
  DateTime = "yyyy-MM-dd'T'HH:mm",
  HourAndMinute = 'HH:mm',
}

export interface MonthsChange {
  month: string;
  year: string;
}

const _DatetimeDirectiveBaseMixin = mixinCanBeDestroyed(class {});

@Directive({
  selector: 'ion-datetime[appUiDatetime]',
  exportAs: 'appUiDatetime',
})
export class DatetimeDirective
  extends _DatetimeDirectiveBaseMixin
  implements OnInit, Partial<Components.IonDatetime>
{
  @HostBinding('class') private readonly _class = 'app-ui-datetime';

  @HostBinding('presentation')
  @Input()
  get presentation(): DatetimePresentation {
    return this._presentation || 'date';
  }

  set presentation(value: DatetimePresentation) {
    this._presentation = value;
  }

  private _presentation: DatetimePresentation = 'date';

  @HostBinding('firstDayOfWeek') private readonly _firstDayOfWeek = 1;

  @Output() private readonly rangeChange: EventEmitter<string[]>;

  @Output() private readonly monthsChange: EventEmitter<MonthsChange>;

  @HostBinding('multiple')
  @Input()
  get enableRange(): boolean {
    return this._enableRange;
  }

  set enableRange(value: BooleanInput) {
    this._enableRange = coerceBooleanProperty(value);
    this.addRangedModifications();
  }

  private _enableRange = false;

  @Input()
  get multiple(): boolean {
    return this._multiple;
  }

  set multiple(value: BooleanInput) {
    this._multiple = coerceBooleanProperty(value);
    this.addRangedModifications();
  }
  private _multiple = false;

  @HostBinding('hourCycle')
  @Input()
  get hourCycle(): Components.IonDatetime['hourCycle'] {
    return this._hourCycle || 'h12';
  }

  set hourCycle(value: Components.IonDatetime['hourCycle']) {
    this._hourCycle = value;
  }

  private _hourCycle: Components.IonDatetime['hourCycle'] = 'h12';

  // The value (one or multiple date strings).
  private dateStrings: string[];

  // Cached values (used to prevent infinite date change events).
  private currentDateStrings: string[];

  constructor(
    @Host() private readonly host: IonDatetime,
    private readonly elementRef: ElementRef<HTMLIonDatetimeElement>
  ) {
    super();
    this.rangeChange = new EventEmitter<string[]>();
    this.monthsChange = new EventEmitter<MonthsChange>();
    this.afterComponentInit();
  }

  ngOnInit() {
    this.host.ionChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ detail }) => {
        this.rangedDateChange(detail.value as string[], true);
      });
  }

  private afterComponentInit() {
    this.nativeElement.componentOnReady().then(() => {
      this.rangedDateChange(this.host.value as string[]);
      this.addMonthChangeEvent();
      this.addRangedModifications();
      this.addRangedEventListeners();
    });
  }

  // DOM manipulations start

  private addRangedModifications() {
    this.addOrRemoveRangedClass();
  }

  private addOrRemoveRangedClass() {
    this.host.multiple = this.enableRange || this.multiple;

    if (!this.enableRange) {
      this.calendarShadowRoot
        ?.querySelector('.datetime-calendar')
        ?.classList.remove('datetime-calendar-ranged');
      return;
    }

    this.calendarShadowRoot
      ?.querySelector('.datetime-calendar')
      ?.classList.add('datetime-calendar-ranged');
  }

  private addRangedEventListeners() {
    if (!this.enableRange) {
      return;
    }

    this.monthsChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.removeActiveDates();
      this.setActiveDates();
    });
  }

  private addStylesToShadowRoot(shadowRoot: ShadowRoot, styles: string) {
    if (!shadowRoot) {
      return;
    }

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);
    const existingSheets = shadowRoot.adoptedStyleSheets;
    shadowRoot.adoptedStyleSheets = [...existingSheets, sheet];
  }

  private removeActiveDates() {
    this.calendarShadowRoot
      .querySelectorAll('.calendar-day')
      .forEach((dayElement) => {
        dayElement.classList.remove('calendar-day-first');
        dayElement.classList.remove('calendar-day-last');
        dayElement.classList.remove('calendar-day-in-range');
      });
  }

  private setActiveDates() {
    if (this.dateStrings?.length === 1) {
      return;
    }

    this.dateStrings?.forEach((date, index) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString();
      const day = d.getDate().toString();

      const calendarDate = this.calendarShadowRoot.querySelector(
        `.calendar-day[data-day="${day}"][data-month="${month}"][data-year="${year}"]`
      ) as HTMLButtonElement;

      if (!calendarDate) {
        return;
      }

      if (index === 0) {
        calendarDate.classList.add('calendar-day-first');
        return;
      }

      if (index === this.dateStrings.length - 1) {
        calendarDate.classList.add('calendar-day-last');
        return;
      }

      calendarDate.classList.add('calendar-day-in-range');
    });
  }

  // DOM manipulations end

  // Other methods start

  public rangedDateChange(
    value: string[],
    emitEvent = false,
    singleSelectionIfPossible = true
  ) {
    if (!this.enableRange) {
      return;
    }

    this.dateStrings = value;
    this.setDate(emitEvent, singleSelectionIfPossible);
  }

  private setDate(emitEvent = false, singleSelectionIfPossible = true) {
    // Detect changes (prevents an infinite loop).
    // Make sure we have at least two dates (otherwise nothing to do).
    if (
      this.currentDateStrings === this.dateStrings ||
      !(this.dateStrings?.length > 1) ||
      !this.enableRange
    ) {
      return;
    }

    this.removeActiveDates();

    // Sort the dates so the earliest one is first.
    this.dateStrings.sort((a, b) => {
      if (a > b) {
        return 1;
      }

      if (a < b) {
        return -1;
      }

      return 0;
    });

    // Revert to single selection (if required).
    if (this.currentDateStrings?.length > 2 && singleSelectionIfPossible) {
      for (const d of this.currentDateStrings) {
        if (this.dateStrings.indexOf(d) === -1) {
          // Make sure this is not the first or last date (those are handled natively).
          if (
            d === this.currentDateStrings[0] ||
            d === this.currentDateStrings[this.currentDateStrings.length - 1]
          ) {
            break;
          }

          this.dateStrings = [d];

          // No need to continue.
          break;
        }
      }
    }

    // Store the new value.
    const newValue = [];
    const start = new Date(`${this.dateStrings[0]}T00:00:00.000`);
    const end = new Date(
      `${this.dateStrings[this.dateStrings.length - 1]}T00:00:00.000`
    );

    // Add all dates between the first and second dates.
    for (
      let d = start;
      isBefore(d, end) || isEqual(d, end);
      d = addDays(d, 1)
    ) {
      newValue.push(this.getDateString(d));
    }

    // Update the values at the end so the UI gets updated only once.
    this.dateStrings = newValue;
    this.currentDateStrings = newValue;
    this.host.value = newValue;

    this.setActiveDates();

    if (!emitEvent) {
      return;
    }

    this.rangeChange.emit(newValue);
  }

  private getDateString(date: Date): string {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    if (+day < 10) {
      day = '0' + day;
    }

    if (+month < 10) {
      month = `0${month}`;
    }

    return `${year}-${month}-${day}`;
  }

  private addMonthChangeEvent() {
    const calendarBody =
      this.calendarShadowRoot.querySelector('.calendar-body');
    if (!calendarBody) {
      return;
    }

    // as you proposed initialising a MutationObserver, but adding mutationRecords to the event details
    const observer = new MutationObserver((mutationRecords) => {
      if (!mutationRecords) {
        return;
      }

      const mutatedMonths = mutationRecords.filter((n) =>
        (n.target as Element).classList.contains('calendar-month-grid')
      );

      // Find unique month/year combinations
      let months: MonthsChange[] = Array.from(mutatedMonths).reduce(
        (accumulator: MonthsChange[], monthMutation) => {
          // Select the first calendar day for the current monthMutation
          const thisMonth = Array.from(
            (monthMutation.target as HTMLDivElement)?.querySelectorAll(
              '.calendar-day'
            )
          ).find((n) => (n as any)?.dataset?.day === '1');

          if (thisMonth) {
            // Ensure thisMonth is not null
            const { month, year } = (thisMonth as HTMLElement).dataset;

            // Check for uniqueness and return updated accumulator
            const isUnique = !accumulator.some(
              (n) => n.month === month && n.year === year
            );
            if (isUnique) {
              accumulator.push({ month, year });
            }
          }

          return accumulator; // Return the accumulator for the next iteration
        },
        [] // Initial value is an empty array
      );

      // we search the middle month
      months = months.sort((a, b) =>
        +a.year === +b.year ? +a.month - +b.month : +a.year - +b.year
      );
      const activeMonth = months.length > 2 ? months[1] : null;

      this.monthsChange.emit(activeMonth);
    });

    observer.observe(this.calendarShadowRoot.querySelector('.calendar-body'), {
      subtree: true,
      childList: true,
    });
  }

  // Other methods end

  // Getters start

  private get nativeElement(): HTMLIonDatetimeElement {
    return this.elementRef.nativeElement;
  }

  private get calendarShadowRoot(): ShadowRoot {
    return this.nativeElement.shadowRoot!;
  }

  public get value() {
    return this.host.value;
  }

  // Getters end
}
