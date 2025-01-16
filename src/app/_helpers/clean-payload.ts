export function cleanPayload(payload: any): any {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value != null)
  );
}
