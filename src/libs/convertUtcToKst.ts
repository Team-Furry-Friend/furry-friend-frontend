export function convertUtcToKst(utcDate: Date) {
  // Create a Date object from the UTC date string
  const dateUtc = new Date(utcDate);

  // Get the UTC time in milliseconds
  const utcTime = dateUtc.getTime();

  // Get the time difference between UTC and KST in milliseconds (UTC+9)
  const koreaTimeOffset = 9 * 60 * 60 * 1000;

  // Calculate the KST time by adding the offset to the UTC time
  const kst = new Date(utcTime + koreaTimeOffset);

  return kst;
}
