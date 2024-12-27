import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonDatetime, IonInput, IonPopover } from '@ionic/angular';
import { compareAsc, format, getMonth, isMatch } from 'date-fns';
import {
  BooleanInput,
  coerceBooleanProperty,
} from 'src/common/coercion/boolean-propert';
import { DateFormat, DatetimeDirective } from '../datetime.directive';
import { Components, DatetimePresentation } from '@ionic/core';
import { mixinCanBeDestroyed } from 'src/common/mixins/can-be-destroyed';
import { takeUntil, debounceTime } from 'rxjs';

let uniqId = 0;

const _DatetimePopoverBaseMixin = mixinCanBeDestroyed(class {});
@Component({
  selector: 'app-ui-datetime-popover',
  templateUrl: './datetime-popover.component.html',
  styleUrls: ['./datetime-popover.component.scss'],
})
export class DatetimePopoverComponent
  extends _DatetimePopoverBaseMixin
  implements OnInit
{
  @ViewChild('datetimePopover') private readonly datetimePopover: IonPopover;

  @ViewChild('ionDatetime') private readonly ionDatetime: IonDatetime;

  @ViewChild('datetime') private readonly datetime: DatetimeDirective;

  @Input({ required: true }) datetimePopoverTriggerFor: any;

  @Input({ required: false }) min: string;
  @Input({ required: false }) max: string;

  @Input()
  get datetimeValueBind(): IonInput {
    return (
      this._datetimeValueBind ||
      (this.datetimePopoverTriggerFor instanceof IonInput
        ? (this.datetimePopoverTriggerFor as IonInput)
        : null)
    );
  }

  set datetimeValueBind(value: IonInput) {
    this._datetimeValueBind = value;
  }

  private _datetimeValueBind: IonInput;

  get value(): string | string[] {
    return this._value;
  }

  set value(value: string | string[]) {
    this._value = value;

    this.datetimeValueBind.value = this.rawValue;

    if (this.rawValue?.includes('T')) {
      const dateObject: Date = new Date(this.rawValue);
      this.datetimeValueBind.value = format(dateObject, 'yyyy-MM-dd HH:mm');
    }

    this.triggerIonInput();
  }

  private _value: string | string[];

  @Input()
  get enableRange(): boolean {
    return this._enableRange && this.format === DateFormat.Date;
  }

  set enableRange(value: BooleanInput) {
    this._enableRange = coerceBooleanProperty(value);
  }

  private _enableRange = false;

  @Input()
  get format(): string {
    return this._format || DateFormat.Date;
  }

  set format(value: string) {
    this._format = value;
  }

  private _format: string;

  @Input()
  get enableActionButtons(): boolean {
    return this._enableActionButtons;
  }

  set enableActionButtons(value: BooleanInput) {
    this._enableActionButtons = coerceBooleanProperty(value);
  }

  private _enableActionButtons = false;

  @Input()
  get presentation(): DatetimePresentation {
    return this._presentation || 'date';
  }

  set presentation(value: DatetimePresentation) {
    this._presentation = value;
    this.setFormatDependingOnPresentation();
  }

  private _presentation: DatetimePresentation = 'date';

  @Input()
  get hourCycle(): Components.IonDatetime['hourCycle'] {
    return this._hourCycle || 'h12';
  }

  set hourCycle(value: Components.IonDatetime['hourCycle']) {
    this._hourCycle = value;
  }

  private _hourCycle: Components.IonDatetime['hourCycle'] = 'h12';

  @Input()
  get autoClose(): boolean {
    return this._autoClose;
  }

  set autoClose(value: BooleanInput) {
    this._autoClose = coerceBooleanProperty(value);
  }

  private _autoClose = false;

  @Input()
  get multiple(): boolean {
    return this._multiple;
  }

  set multiple(value: BooleanInput) {
    this._multiple = coerceBooleanProperty(value);
  }

  private _multiple = false;

  private readonly defaultTriggerId = `app-ui-datetime-trigger-${uniqId++}`;

  public triggerId: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.setTriggerId();
    this.addTrigger();
    this.attachToBoundValueChanges();
  }

  async reset() {
    this.resetValue();
    await this.ionDatetime.reset();
  }

  async cancel() {
    this.resetValue();
    await this.ionDatetime.cancel(true);
  }

  async confirm() {
    if (this.multiple) {
      const selectedDates = this.ionDatetime.value as string[];
      this.value = selectedDates.map((date) =>
        format(new Date(date), 'yyyy-MM-dd')
      );
    } else {
      await this.ionDatetime.confirm(this.autoClose);
    }
  }

  async close() {
    await this.datetimePopover.dismiss();
  }

  private resetValue() {
    this.datetimeValueBind.value = null;
    this.value = null;
  }

  private setTriggerId() {
    const id = this.datetimePopoverTriggerFor.el.getAttribute('id');

    if (id) {
      this.triggerId = id;
      return;
    }

    this.triggerId = this.defaultTriggerId;
    this.datetimePopoverTriggerFor.el.setAttribute('id', this.triggerId);
  }

  private addTrigger() {
    (this.datetimePopoverTriggerFor.el as HTMLElement).addEventListener(
      'click',
      (event) => {
        const { parent, isIonItem } = this.getTriggerParent(
          event.target as HTMLElement
        );

        if (isIonItem) {
          this.addParentTrigger(parent);
          return;
        }

        void this.datetimePopover.present(event);
      }
    );
  }

  private addParentTrigger(parent: HTMLElement) {
    const clickEvent = (
      event: MouseEvent | TouchEvent | PointerEvent | CustomEvent
    ) => this.datetimePopover.present(event);
    parent.addEventListener('click', clickEvent);
    parent.click();
    parent.removeEventListener('click', clickEvent);
  }

  private attachToBoundValueChanges() {
    this.setValue();
    this.datetimeValueBind?.ionInput
      .pipe(takeUntil(this.destroy$), debounceTime(1000))
      .subscribe(
        (event: CustomEvent<{ __isForced?: boolean; [k: string]: any }>) => {
          if (event.detail.__isForced) {
            return;
          }

          this.setValue();
        }
      );
  }

  public triggerIonInput() {
    //Trigger onChange function manually
    const evt = new CustomEvent('ionInput', {
      detail: { __isForced: true },
      bubbles: true,
      cancelable: false,
    });
    this.datetimeValueBind['el'].dispatchEvent(evt);
  }

  public dismissPopover() {
    // TODO: just for test. If it breaks calendar remove ( ionChange ) from template
    //@ts-expect-error expects error on el
    if (this.ionDatetime.el.classList.contains('month-year-picker-open')) {
      return;
    }

    if (this.multiple) {
      return;
    }

    return this.datetimePopover.dismiss();
  }

  private setValue() {
    if (this.enableRange) {
      return this.setRangedValue();
    }

    if (this.multiple) {
      return this.setMultipleValue();
    }

    return this.setNonRangedValue();
  }

  private setMultipleValue() {
    if (!this.multiple) {
      return;
    }
    const values = (this.datetimeValueBind.value as string)
      ?.split(', ')
      .map((date) => date.trim());
    if (!values?.every((date) => this.isValidDate(date))) {
      return;
    }

    this.value = values;
  }

  private setRangedValue(emitEvent = false) {
    if (!this.enableRange) {
      return;
    }

    if (
      !(this.datetimeValueBind.value as string)
        ?.split(' - ')
        ?.every((date) => this.isValidDate(date))
    ) {
      return;
    }

    this.value = this.boundValue;

    if (!this.datetime) {
      return;
    }

    this.datetime.rangedDateChange(this.value as string[], emitEvent, false);
    this.value = this.datetime.value;
  }

  private setNonRangedValue() {
    if (!this.isValidDate(this.datetimeValueBind.value as string)) {
      return;
    }

    this.value = this.boundValue;
  }

  private isValidDate(date: string) {
    return isMatch(date, this.format);
  }

  private getStartAndEndDateFromArray(dateArr: string[]) {
    return dateArr
      .map((date) => new Date(date))
      .sort(compareAsc)
      .filter((_, idx) => idx === 0 || idx === dateArr.length - 1)
      .map((date) => format(date, this.format))
      .join(' - ');
  }

  private getTriggerParent(element: HTMLElement): {
    parent: HTMLElement;
    isIonItem: boolean;
  } {
    const parent = element.parentElement;
    const isIonItem = parent.tagName.toLowerCase() === 'ion-item';

    return {
      parent,
      isIonItem,
    };
  }

  private setFormatDependingOnPresentation() {
    let format: DateFormat = DateFormat.Date;
    if (this._presentation === 'date') {
      format = DateFormat.Date;
    }

    if (
      this._presentation === 'date-time' ||
      this._presentation === 'time-date'
    ) {
      format = DateFormat.DateTime;
    }

    if (this._presentation === 'time') {
      format = DateFormat.HourAndMinute;
    }

    if (this._presentation === 'year') {
      format = DateFormat.Year;
    }

    if (this._presentation === 'month') {
      format = DateFormat.Month;
    }

    if (this._presentation === 'month-year') {
      format = DateFormat.YearAndMonth;
    }

    this.format = this._format || format;
  }

  private get boundValue(): string | string[] {
    const value = this.datetimeValueBind?.value as string;

    if (this.enableRange) {
      const dateArr = value?.split(' - ');
      return dateArr?.every((date) => this.isValidDate(date)) ? dateArr : null;
    }

    if (this.multiple) {
      const dateArr = value?.split(',').map((date) => date.trim());
      return dateArr?.every((date) => this.isValidDate(date)) ? dateArr : null;
    }

    const isValidDate = this.isValidDate(value);

    if (this.presentation === 'month' && isValidDate) {
      const monthValue = new Date();
      monthValue.setMonth(+value - 1);
      return monthValue.toISOString();
    }

    return isValidDate ? value : null;
  }

  private get rawValue(): string {
    let value = this.value || this.boundValue;

    if (!value) {
      return null;
    }

    if (this.enableRange) {
      return this.getStartAndEndDateFromArray(value as string[]);
    }

    if (this.multiple) {
      return (value as string[]).join(', ');
    }

    if (
      this.presentation === 'date' ||
      this.presentation === 'time-date' ||
      this.presentation === 'date-time'
    ) {
      return format(new Date(value as string), this.format);
    }

    if (this.presentation === 'month' && this.value) {
      const month = getMonth(new Date(this.value as string)) + 1;
      value = month < 10 ? `0${month}` : month.toString();
    }

    if (this.presentation === 'time') {
      try {
        return format(new Date(value as string), this.format);
      } catch {
        return value as string;
      }
    }

    return value as string;
  }
}
