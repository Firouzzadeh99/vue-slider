<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "اسلایدر محصولات",
  },
  items: {
    type: Array,
    required: true,
  },
});

const scrollAmount = ref(300);
const carouselRef = ref(null);
const autoSlideInterval = ref(null);
const kickoffTimeout = ref(null);
const isMobile = ref(false);

const computeSlideSize = () => {
  nextTick(() => {
    const firstItem = carouselRef.value?.querySelector(".full-item");
    if (firstItem) {
      const styles = window.getComputedStyle(firstItem);
      const marginRight = parseFloat(styles.marginRight || "0");
      scrollAmount.value =
        firstItem.getBoundingClientRect().width + (marginRight || 0);
    }
  });
};

const updateViewportFlags = () => {
  isMobile.value = window.innerWidth < 768;
  computeSlideSize();

  if (window.innerWidth >= 1024) {
    startAutoSlide();
  } else {
    stopAutoSlide();
  }
};

const scrollPrev = () => {
  const innerCarousel = carouselRef.value?.querySelector(".carousel-inner");
  if (!innerCarousel) return;

  innerCarousel.scrollBy({ left: -scrollAmount.value, behavior: "smooth" });
};

const scrollNext = () => {
  const innerCarousel = carouselRef.value?.querySelector(".carousel-inner");
  if (!innerCarousel) return;

  const maxScroll = innerCarousel.scrollWidth - innerCarousel.clientWidth;
  if (innerCarousel.scrollLeft >= maxScroll - 10) {
    innerCarousel.scrollTo({ left: 0, behavior: "smooth" });
  } else {
    innerCarousel.scrollBy({ left: scrollAmount.value, behavior: "smooth" });
  }
};

const startAutoSlide = () => {
  if (!process.client || window.innerWidth < 1024) return;
  stopAutoSlide();
  computeSlideSize();

  kickoffTimeout.value = setTimeout(() => {
    scrollNext();
    autoSlideInterval.value = setInterval(() => {
      scrollNext();
    }, 4000);
  }, 4000);
};

const stopAutoSlide = () => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value);
    autoSlideInterval.value = null;
  }
  if (kickoffTimeout.value) {
    clearTimeout(kickoffTimeout.value);
    kickoffTimeout.value = null;
  }
};

onMounted(() => {
  updateViewportFlags();
  window.addEventListener("resize", updateViewportFlags);
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
  window.removeEventListener("resize", updateViewportFlags);
});
</script>

<template>
  <div class="w-full">
    <div
      class="fullCarousel relative overflow-hidden h-[425px] md:h-[600px]"
      ref="carouselRef"
      @mouseenter="stopAutoSlide"
      @mouseleave="startAutoSlide"
    >
      <div
        class="carousel-inner flex overflow-x-auto scrollbar-hide scroll-smooth h-full"
      >
        <div
          class="full-item flex-shrink-0 rounded-2xl md:rounded-none w-full md:w-full h-full relative"
          v-for="(item, index) in items"
          :key="index"
          :class="{ 'md:w-1/2': false }"
        >
          <NuxtLink
            :to="item.link"
            class="block w-full rounded-2xl md:rounded-none h-full relative"
          >
            <div class="absolute inset-0" v-if="isMobile !== null">
              <picture class="block h-full w-full">
                <img
                  :src="isMobile ? item.image.mobile : item.image.desktop"
                  alt=""
                  class="h-full w-full object-cover rounded-2xl lg:rounded-none"
                  loading="lazy"
                  referrerpolicy="no-referrer"
                />
              </picture>

              <div
                v-if="isMobile"
                class="absolute hidden lg:block inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div
                v-else
                class="absolute hidden lg:block inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent"
              ></div>
            </div>

            <div
              class="absolute lg:hidden top-4 left-0 right-0 md:top-1/2 md:-translate-y-1/2 md:left-16 md:right-auto md:max-w-xl px-6 md:px-0 z-10 text-left"
            >
              <h2
                class="text-white md:text-gray-900 text-3xl md:text-5xl font-bold mb-3 md:mb-4 drop-shadow-lg md:drop-shadow-none"
              >
                {{ item.title }}
              </h2>
              <p
                v-if="item.description"
                class="text-white/90 md:text-gray-700 text-base md:text-xl drop-shadow-md md:drop-shadow-none"
              >
                {{ item.description }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <button
        class="hidden md:flex absolute left-8 top-[44%] -translate-y-1/2 w-24 scale-150 h-24 bg-transparent text-gray-600 hover:text-gray-800 rounded-full shadow-none items-center justify-center transition-all duration-300 z-20 hover:scale-[1.7]"
        @click="scrollPrev"
        type="button"
        aria-label="قبلی"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        class="hidden md:flex absolute right-8 top-[44%] -translate-y-1/2 w-24 scale-150 h-24 bg-transparent text-gray-600 hover:text-gray-800 rounded-full shadow-none items-center justify-center transition-all duration-300 z-20 hover:scale-[1.7]"
        @click="scrollNext"
        type="button"
        aria-label="بعدی"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.carousel-inner {
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-snap-type: x mandatory;
  direction: ltr;
}

.carousel-inner::-webkit-scrollbar {
  display: none;
}

.full-item {
  scroll-snap-align: start;
  direction: ltr;
}

.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

@media (max-width: 767px) {
  .full-item {
    width: calc(100% / 1.5);
    margin-right: 4vw;
  }

  .carousel-inner {
    padding-right: 4vw;
    padding-left: 2vw;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .full-item {
    width: calc(100% / 2.5);
    margin-right: 2vw;
  }

  .carousel-inner {
    padding-right: 2vw;
    padding-left: 1vw;
  }
}
</style>
