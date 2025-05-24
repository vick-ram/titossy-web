import { ref, onMounted, onUnmounted } from "vue";

export enum Breakpoint {
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
  XXL = "xxl",
}

export const breakpoints = {
  [Breakpoint.XS]: 0,
  [Breakpoint.SM]: 576,
  [Breakpoint.MD]: 768,
  [Breakpoint.LG]: 992,
  [Breakpoint.XL]: 1200,
  [Breakpoint.XXL]: 1400,
};

export function useBreakpoints() {
  const currentBreakpoint = ref<Breakpoint>(Breakpoint.XS);

  const updateBreakpoint = () => {
    const width = window.innerWidth;

    if (width < breakpoints[Breakpoint.SM]) {
      currentBreakpoint.value = Breakpoint.XS;
    } else if (width < breakpoints[Breakpoint.MD]) {
      currentBreakpoint.value = Breakpoint.SM;
    } else if (width < breakpoints[Breakpoint.LG]) {
      currentBreakpoint.value = Breakpoint.MD;
    } else if (width < breakpoints[Breakpoint.XL]) {
      currentBreakpoint.value = Breakpoint.LG;
    } else if (width < breakpoints[Breakpoint.XXL]) {
      currentBreakpoint.value = Breakpoint.XL;
    } else {
      currentBreakpoint.value = Breakpoint.XXL;
    }
  };

  onMounted(() => {
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateBreakpoint);
  })

  return {
    currentBreakpoint,
    isMobile: () => currentBreakpoint.value === Breakpoint.XS,
    isTablet: () => [Breakpoint.SM, Breakpoint.MD].includes(currentBreakpoint.value),
    isDesktop: () => currentBreakpoint.value >= Breakpoint.LG,
    breakpoints: breakpoints
  }
}
