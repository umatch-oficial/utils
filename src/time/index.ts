import { Duration } from 'luxon';

import type { DurationLike } from 'luxon';

export async function sleep(duration: DurationLike): Promise<void> {
  const durationObject = Duration.fromDurationLike(duration);
  const milliseconds = durationObject.toMillis();

  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
