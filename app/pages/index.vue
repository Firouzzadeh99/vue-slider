<script setup>
const brands = [
{
    title: "Wishlist-ready gifts are here",
    image: {
      desktop: "https://m.media-amazon.com/images/I/71ZX4oFDseL._SX3000_.jpg",
      mobile:  "https://m.media-amazon.com/images/I/711HpvDL-lL._SR855,1368_.jpg"
    },
    link: "/brands/lg",
  },
  {
    title: "Gifts for her under $50",
    image: {
      desktop: "https://m.media-amazon.com/images/I/81H-rqTT6QL._SX3000_.jpg",
      mobile:  "https://m.media-amazon.com/images/I/71mdUo-uwVL._SR855,1368_.jpg"
    },
    link: "/brands/motorola",
  },
  {
    title: "Kitchen must-haves",
    image: {
      desktop: "https://m.media-amazon.com/images/I/71SRwYaVx3L._SX3000_.jpg",
      mobile:  "https://m.media-amazon.com/images/I/51l7ZOsRo7L._SR855,1368_.jpg"
    },
    link: "/brands/samsung",
  },
  {
    title: "Start looking sharp",
    image: {
      desktop: "https://m.media-amazon.com/images/I/81ncEnaGs3L._SX3000_.jpg",
      mobile:  "https://m.media-amazon.com/images/I/61R7G24e7dL._SR855,1320_.jpg"
    },
    link: "/brands/apple",
  },
 
];
 
    
    useHead({
      title: "فروشگاه آنلاین - صفحه اصلی",
      meta: [
        {
          name: "description",
          content: "بهترین برندها و محصولات را در فروشگاه آنلاین ما بیابید",
        },
      ],
    });
    </script>
    
    <template>
        <div class="relative py-5 lg:py-0">
          <!-- اسلایدر -->
          <ProductSlider :items="brands" />
      
          <!-- کارت‌ها روی اسلایدر -->
          <div class="absolute -bottom-32 hidden lg:flex left-0 right-0 z-10 justify-center gap-6 px-4 lg:px-12">
            <div class="w-[420px] h-[420px] bg-white"></div>
            <div class="w-[420px] h-[420px] bg-white"></div>
            <div class="w-[420px] h-[420px] bg-white"></div>
            <div class="w-[420px] h-[420px] bg-white"></div>
          </div>
        </div>
        <div class="h-[400px]"></div>
      </template>
    
    <style scoped>
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fade-in {
      animation: fade-in 1s ease-out;
    }
    
    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.05);
      }
    }
    
    .animate-pulse {
      animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    .delay-1000 {
      animation-delay: 1s;
    }
    </style>