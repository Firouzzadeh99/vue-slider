<script setup>
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const menuItems = [
  { title: 'خانه', link: '/' },
  { title: 'محصولات', link: '/products' },
  { title: 'برندها', link: '/brands' },
  { title: 'تماس با ما', link: '/contact' },
  { title: 'درباره ما', link: '/about' },
]
</script>

<template>
  <header class="bg-gradient-to-r from-[#085749] to-[#014837] sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
         <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-3 space-x-reverse">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
              <span class="text-2xl font-bold text-blue-600">ف</span>
            </div>
            <span class="text-white text-2xl font-bold hidden sm:block">فروشگاه آنلاین</span>
          </NuxtLink>
        </div>

         <nav class="hidden md:flex items-center space-x-8 space-x-reverse">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.title"
            :to="item.link"
            class="text-white hover:text-yellow-300 transition-colors duration-300 font-medium text-lg relative group"
          >
            {{ item.title }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
        </nav>

         <div class="flex items-center gap-4">
           <button 
            class="hidden sm:flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300"
            aria-label="جستجو"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

           <button 
            class="relative flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300"
            aria-label="سبد خرید"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
          </button>

           <button 
            @click="toggleMenu"
            class="md:hidden flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300"
            aria-label="منو"
          >
            <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

       <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <nav v-if="isMenuOpen" class="md:hidden py-4 border-t border-white/20">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link"
            @click="toggleMenu"
            class="block py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors duration-300 font-medium"
          >
            {{ item.title }}
          </NuxtLink>
        </nav>
      </Transition>
    </div>
  </header>
</template>