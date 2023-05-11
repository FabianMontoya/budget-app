import { computed } from 'vue';
import { useMq } from 'vue3-mq';

export function useMQ() {
  const mq = useMq();
  const current = computed(() => mq.current);
  const isPhone = computed(() => mq.current === 'phone');
  const isTablet = computed(() => mq.current === 'tablet');

  return { mq, isPhone, isTablet, current };
}
