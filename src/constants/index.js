const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  /* {
    id: 1,
    img: "/icons/wifi.svg",
  }, */
  {
    id: 2,
    img: "/icons/search.svg",
    type: "safari",
  },
  {
    id: 3,
    img: "/icons/music.svg",
    type: "music",
  },
  {
    id: 4,
    img: "/icons/user.svg",
    type: "finder",
    action: "about",
  },
  /* {
    id: 5,
    img: "/icons/mode.svg",
  }, */
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.webp",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.webp",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.webp",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.webp",
    canOpen: true,
  },
  // {
  //   id: "vscode",
  //   name: "VS Code",
  //   icon: "code2.webp",
  //   canOpen: true,
  // },
  {
    id: "music",
    name: "Music", // was "Trash"
    icon: "music.webp",
    canOpen: true,
  },
  {
    id: "game",
    name: "Games",
    icon: "game.webp",
    canOpen: true,
  },
  {
    id: "trash", // unique id to avoid duplicate keys in Dock
    name: "Trash",
    icon: "trash.webp",
    canOpen: true,
    action: "trash",
  },
];

const blogPosts = [
  {
    id: 1,
    date: "April 6, 2026",
    title: "Home",
    image: "/images/blog1.png",
    link: "https://blog.thecodingant.in",
  },
  {
    id: 2,
    date: "April 6, 2026",
    title:
      "Design for Developers: Making Your UI Actually Work Everywhere Part 2",
    image: "/images/blog1.png",
    link: "https://blog.thecodingant.in/design-for-developers-making-your-ui-actually-work-everywhere-part-2",
  },
  {
    id: 3,
    date: "April 5, 2026",
    title: "Design for Developers: Stop Making Your Apps Look Like PO Part 1",
    image: "/images/blog1.png",
    link: "https://blog.thecodingant.in/design-for-developers-stop-making-your-apps-look-like-po-part-1",
  },
  {
    id: 4,
    date: "April 4, 2026",
    title:
      "Your Site is Slow? Now What: A Developer’s Guide to Actually Finding the Problem",
    image: "/images/blog1.png",
    link: "https://blog.thecodingant.in/your-site-is-slow-now-what-a-developer-s-guide-to-actually-finding-the-problem",
  },
  {
    id: 5,
    date: "April 3, 2026",
    title: "React 19: The Update That Actually Changes How You Build",
    image: "/images/blog1.png",
    link: "https://blog.thecodingant.in/react-19-the-update-that-actually-changes-how-you-build",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "JavaScript", "TypeScript", "HTML5", "Vite"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "GSAP", "CSS3"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "REST APIs"],
  },
  {
    category: "Database",
    items: ["SQL"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Axios", "Jest", "Figma"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/Nitesh000",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/nitesh000/",
  },
  {
    id: 2,
    text: "Youtube",
    icon: "/icons/youtube.svg",
    bg: "#4bcb63",
    link: "https://www.youtube.com/@niteshtudu6449",
  },
  {
    id: 3,
    text: "Discord",
    icon: "/icons/discord.svg",
    bg: "#ff866b",
    link: "https://discord.gg/yuu040",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal2.webp",
  },
  {
    id: 2,
    img: "/images/gal3.jpg",
  },
  {
    id: 3,
    img: "/images/gal5.webp",
  },
  {
    id: 4,
    img: "/images/gal4.webp",
  },
  {
    id: 5,
    img: "/images/gal1.webp",
  },
  {
    id: 6,
    img: "/images/gal6.webp",
  },
  {
    id: 7,
    img: "/images/wallpaper.webp",
  },
  {
    id: 8,
    img: "/images/gal7.webp",
  },
  {
    id: 9,
    img: "/images/gal8.jpg",
  },
  {
    id: 10,
    img: "/images/gal15.webp",
  },
  {
    id: 11,
    img: "/images/gal10.jpg",
  },
  {
    id: 12,
    img: "/images/gal11.jpg",
  },
  {
    id: 13,
    img: "/images/gal12.jpg",
  },
  {
    id: 14,
    img: "/images/gal13.webp",
  },
  {
    id: 15,
    img: "/images/gal14.webp",
  },
  {
    id: 16,
    img: "/images/gal9.webp",
  },
  {
    id: 17,
    img: "/images/gal16.webp",
  },
];

const songs = [
  {
    id: 1,
    title: "On My Mind",
    author: "Maximillian",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217441/On_My_Mind_meazni.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217334/ab67616d0000b273dbe6f667bde69d5360b2b01f_v39jhp.jpg",
  },
  {
    id: 2,
    title: "Mirror",
    author: "Lil Wayne, Bruno Mars",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217418/Mirror_lixwvl.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217328/ab67616d0000b273e80b258c7e0b318202870953_u7zzxc.jpg",
  },
  {
    id: 3,
    title: "Every Second",
    author: "Mina Okabe",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217413/Every_Second_m5mdtc.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217327/ab67616d0000b273fc03b97c30ce11e30e65e389_jk7i3c.jpg",
  },
  {
    id: 4,
    title: "People",
    author: "Libianca",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217431/People_e7kwy6.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217331/ab67616d0000b273fc342f95f117d48dbdde9735_jkyagq.jpg",
  },
  {
    id: 5,
    title: "Never Go Back",
    author: "Dennis Lloyd",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217430/Never_Go_Back_urajj2.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217329/ab67616d0000b2733e5170dca1d41c6ab6824506_pxb4mu.jpg",
  },
  {
    id: 6,
    title: "THOUSAND MILES",
    author: "Te Kid LAROI",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217447/THOUSAND_MILES_xt7jgj.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217334/ab67616d0000b2734d87a174e187ccb635533f40_lvap17.jpg",
  },
  {
    id: 7,
    title: "Popular - The Idol Vol. 1",
    author: "The Weeknd, Playboi Carti, Madonna",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217416/Popular_with_Playboi_Carti_Madonna_-_From_The_Idol_Vol._1_Music_from_the_HBO_Original_Series_c0tbku.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217329/ab67616d0000b2734c8f092adc59b4bf4212389d_sz1zkp.jpg",
  },
  {
    id: 8,
    title: "The Way I Are",
    author: "Timbaland, Keri Hilson, D.O.E.",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217431/The_Way_I_Are_boi1th.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217331/ab67616d0000b2734ed674ab91bdc566534f9285_pjd4uz.jpg",
  },
  {
    id: 9,
    title: "Woh",
    author: "Khatth, Sthiti, Shruti Prakash Das",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217432/Woh_pqhrsx.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217333/ab67616d0000b2739e3124734f9abe3916bce831_szzide.jpg",
  },
  {
    id: 10,
    title: "novocaine",
    author: "GenriX, CORBAL, Shiloh Dynasty",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217424/novocaine_qdmk3t.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217331/ab67616d0000b27314e21b4fc24f2b3cae15ef93_mnhgua.jpg",
  },
  {
    id: 11,
    title: "Right Round",
    author: "Flo Rida, Kesha",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217424/Right_Round_kignsx.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217330/ab67616d0000b27318aa5d7e6d484b832cd5d03f_vafs1x.jpg",
  },
  {
    id: 12,
    title: "Under The Influence",
    author: "Chris Brown",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217423/Under_The_Influence_tsg6po.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217331/ab67616d0000b27348f69a441c575fa5926a0831_wv6tmx.jpg",
  },
  {
    id: 13,
    title: "bargad",
    author: "sufr, Arpit Bala, toorjo dev",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217440/bargad_ujslgn.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217334/ab67616d0000b27369ecc359541c8a49aae7716f_quf5gz.jpg",
  },
  {
    id: 14,
    title: "Farebi",
    author: "Third Hour, Jolk, VZO",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217435/Farebi_lhtgab.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217335/ab67616d0000b27374b0ecce16c80f41e9456a8c_meruc6.jpg",
  },
  {
    id: 15,
    title: "Passing Though",
    author: "Meraki Moon",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217436/Passing_Through_riod0d.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217333/ab67616d0000b2730037cdcb4d91eb181f6f438d_uz9ukb.jpg",
  },
  {
    id: 16,
    title: "The Machine",
    author: "Reed Wonder, Aurora Olivas",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217435/The_Machine_n6zdnx.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217330/ab67616d0000b2731967da4adf2250eea56f6894_y4zal0.jpg",
  },
  {
    id: 17,
    title: "chaandni",
    author: "sufr, Adil",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217438/chaandni_ljl0wu.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217335/ab67616d0000b2735973fafd0ac6a1439ed060d7_y14p9f.jpg",
  },
  {
    id: 18,
    title: "I'd Rather Love - Remix",
    author: "Norhan, NAJ, Michael Hakim",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217452/I_d_Rather_Love_-_Remix_mtqhcb.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217336/ab67616d0000b273425452593655097af1c1f53c_hrecy5.jpg",
  },
  {
    id: 19,
    title: "Can't Stop",
    author: "Max Wassen, 20syl",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217430/Can_t_Stop_llfwrh.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217332/ab67616d00001e02471e8bd9152b05dca8b027b5_sttkph.jpg",
  },

  {
    id: 20,
    title: "Moonlight",
    author: "Kansy",
    src: "https://res.cloudinary.com/doqtqybtr/video/upload/v1775217428/Moonlight_rkm0gg.mp3",
    cover:
      "https://res.cloudinary.com/doqtqybtr/image/upload/v1775217332/ab67616d00001e02039818415c8166b5fb5a1e61_ly4dpr.jpg",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
  songs,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1 pdf kit
    {
      id: 5,
      name: "PDF-Kit",
      icon: "/images/folder.webp",
      kind: "folder",
      position: "top-45 right-80 ",
      windowPosition: "top-[10vh] left-15", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "pdf kit.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-60 right-70 ",
          description: [
            "Convert images to PDF and PDF to images instantly. 100% free, no sign-up required, and your files never leave your browser.",
          ],
        },
        {
          id: 2,
          name: "pdf-kit.thecodingant.in",
          icon: "/images/safari.webp",
          kind: "file",
          fileType: "url",
          href: "https://pdf-kit.thecodingant.in/",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "pdf kit.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl:
            "https://res.cloudinary.com/doqtqybtr/image/upload/v1775328893/D_PDF_Kit_ks4pnx.png",
        },
        {
          id: 5,
          name: "pdf kit.github",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/Nitesh000/pdf-kit",
          position: "top-5 right-10",
        },
      ],
    },
    // ▶ Project 2 web tools
    {
      id: 6,
      name: "Web tools",
      icon: "/images/folder.webp",
      kind: "folder",
      position: "top-10 left-0", // icon position inside Finder
      windowPosition: "top-[25vh] left-30",
      children: [
        {
          id: 1,
          name: "Web Tools.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-52 right-80",
          description: ["All the needed webtools are available right here."],
        },
        {
          id: 2,
          name: "https://polite-sundae-3c387d.netlify.app",
          icon: "/images/safari.webp",
          kind: "file",
          fileType: "url",
          href: "https://shopkar-react.vercel.app/",
          position: "top-5 left-10",
        },
        {
          id: 4,
          name: "Web tools.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-65 right-30",
          imageUrl:
            "https://res.cloudinary.com/doqtqybtr/image/upload/v1775333798/195cca92-ed4d-409a-ab6f-712964b2b341.png",
        },
        {
          id: 5,
          name: "Web tools.github",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/Nitesh000/web-tools",
          position: "top-10 right-45",
        },
      ],
    },
    // ▶ Project 3 Tidy Tasks
    {
      id: 7,
      name: "Jotion",
      icon: "/images/folder.webp",
      kind: "folder",
      position: "top-10 left-50",
      windowPosition: "top-[40vh] left-15",
      children: [
        {
          id: 1,
          name: "Jotion.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-67 right-85",
          description: [
            "Jotion (notion clone) with rich text, note taking beautiful ui.",
          ],
        },
        {
          id: 2,
          name: "Jotion.com",
          icon: "/images/safari.webp",
          kind: "file",
          fileType: "url",
          href: "https://jotion.thecodingant.in",
          position: "top-25 left-30",
        },
        {
          id: 4,
          name: "Jotion.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-60 right-20",
          imageUrl:
            "https://res.cloudinary.com/doqtqybtr/image/upload/v1775337229/9b113112-3111-47fc-8bef-efafbaa2f30f.png",
        },
        {
          id: 5,
          name: "Jotion.github",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/Nitesh000/notion-clone",
          position: "top-10 right-20",
        },
      ],
    },
    // ▶ Project 4 Movie Plex
    // {
    //   id: 8,
    //   name: "Movie Plex",
    //   icon: "/images/folder.webp",
    //   kind: "folder",
    //   position: "top-80 right-55",
    //   windowPosition: "top-[55vh] left-30",
    //   children: [
    //     {
    //       id: 1,
    //       name: "Movie Plex.txt",
    //       icon: "/images/txt.png",
    //       kind: "file",
    //       fileType: "txt",
    //       position: "top-60 right-70",
    //       description: [
    //         "MoviePlex is a sleek movie discovery app built with React and Vite, designed for browsing films quickly and effortlessly.",
    //         "Instead of a plain search tool, it offers smooth navigation, real-time search results, and clean movie previews that make exploring titles genuinely fun.",
    //         "Think of it like a mini streaming dashboard search movies, check ratings, and view details with a UI that feels fast, modern, and distraction-free.",
    //         "Powered by the TMDB API, React Hooks, and a responsive layout, it delivers a sharp, app-like experience across all devices with near-instant performance.",
    //       ],
    //     },
    //     {
    //       id: 2,
    //       name: "MoviePlex.com",
    //       icon: "/images/safari.webp",
    //       kind: "file",
    //       fileType: "url",
    //       href: "https://movieplexapp.vercel.app/",
    //       position: "top-20 left-20",
    //     },
    //     {
    //       id: 4,
    //       name: "Movie Plex.png",
    //       icon: "/images/image.png",
    //       kind: "file",
    //       fileType: "img",
    //       position: "top-52 left-80",
    //       imageUrl: "/images/movieplex.webp",
    //     },
    //     {
    //       id: 5,
    //       name: "Movie Plex.github",
    //       icon: "/images/plain.png",
    //       kind: "file",
    //       fileType: "fig",
    //       href: "https://github.com/SwastikSharma15/Movie-React-App",
    //       position: "top-5 right-10",
    //     },
    //   ],
    // },
    // ▶ Project 5 Mojito Mix
    // {
    //   id: 9,
    //   name: "Mojito Mix",
    //   icon: "/images/folder.webp",
    //   kind: "folder",
    //   position: "top-80 right-5",
    //   windowPosition: "top-[70vh] left-15",
    //   children: [
    //     {
    //       id: 1,
    //       name: "Mojito Mix.txt",
    //       icon: "/images/txt.png",
    //       kind: "file",
    //       fileType: "txt",
    //       position: "top-50 left-20",
    //       description: [
    //         "MojitoMix is a niche beverage-store website focused entirely on handcrafted mojitos, built to showcase flavors in a clean, modern layout.",
    //         "Instead of a generic product grid, it delivers a refreshing browsing experience with vibrant visuals, smooth transitions, and detailed flavor profiles for every mojito variant.",
    //         "Think of it like walking into a specialty mojito bar each drink highlighted with its own look, description, and pricing, making the shopping flow effortless and enjoyable.",
    //         "Built with React and Tailwind, it offers fast performance, responsive design, and a polished UI that feels crisp across all screen sizes.",
    //       ],
    //     },
    //     {
    //       id: 2,
    //       name: "MojitoMix.com",
    //       icon: "/images/safari.webp",
    //       kind: "file",
    //       fileType: "url",
    //       href: "https://mojitomix.vercel.app",
    //       position: "top-5 left-10",
    //     },
    //     {
    //       id: 4,
    //       name: "Mojito Mix.png",
    //       icon: "/images/image.png",
    //       kind: "file",
    //       fileType: "img",
    //       position: "top-60 right-20",
    //       imageUrl: "/images/mojito.webp",
    //     },
    //     {
    //       id: 5,
    //       name: "Mojito Mix.github",
    //       icon: "/images/plain.png",
    //       kind: "file",
    //       fileType: "fig",
    //       href: "https://github.com/SwastikSharma15/Learning-GSAP",
    //       position: "top-15 right-30",
    //     },
    //   ],
    // },
    // ▶ Project 6 VS Code Web IDE
    // {
    //   id: 10,
    //   name: "VS Code Web IDE",
    //   icon: "/images/folder.webp",
    //   kind: "folder",
    //   position: "top-45 right-30",
    //   windowPosition: "top-[40vh] left-40",
    //   children: [
    //     {
    //       id: 1,
    //       name: "VS Code.txt",
    //       icon: "/images/txt.png",
    //       kind: "file",
    //       fileType: "txt",
    //       position: "top-60 right-70",
    //       description: [
    //         "VS Code Web IDE is a browser-based recreation of Visual Studio Code, built to simulate the look, feel, and interaction patterns of a real development environment.",
    //         "Instead of a static code viewer, it delivers an immersive IDE-like experience with a file explorer, multi-tab editor, terminal panel, and a VS Code–inspired dark theme.",
    //         "Think of it as opening VS Code directly in your browser where files, tabs, and panels behave like a real editor, making the interface familiar and intuitive for developers.",
    //         "Built with React, Vite, and modern UI patterns, it focuses on performance, responsiveness, and clean state management, while adding a Canvas-based interactive animation layer for an engaging twist.",
    //       ],
    //     },
    //     {
    //       id: 2,
    //       name: "VSCode.com",
    //       icon: "/images/safari.webp",
    //       kind: "file",
    //       fileType: "url",
    //       href: "https://vs-code-web-ide.vercel.app/",
    //       position: "top-20 left-20",
    //     },
    //     {
    //       id: 4,
    //       name: "VS Code.png",
    //       icon: "/images/image.png",
    //       kind: "file",
    //       fileType: "img",
    //       position: "top-52 left-80",
    //       imageUrl: "/images/vscode.png",
    //     },
    //     {
    //       id: 5,
    //       name: "VS Code.github",
    //       icon: "/images/plain.png",
    //       kind: "file",
    //       fileType: "fig",
    //       href: "https://github.com/SwastikSharma15/VS-Code-Web-IDE",
    //       position: "top-15 right-40",
    //     },
    //   ],
    // },
    // PentaGo Online
    // {
    //   id: 11,
    //   name: "PentaGo Online",
    //   icon: "/images/folder.webp",
    //   kind: "folder",
    //   position: "top-10 right-5",
    //   windowPosition: "top-[10vh] left-40",
    //   children: [
    //     {
    //       id: 1,
    //       name: "PentaGo Online.txt",
    //       icon: "/images/txt.png",
    //       kind: "file",
    //       fileType: "txt",
    //       position: "top-67 right-85",
    //       description: [
    //         "PentaGo Online is a real-time multiplayer strategy game I built using React, TypeScript, and Socket.io.",
    //         "The game is based on the Pentago board system, where players not only place pieces but also rotate sections of the board, which makes state management and game logic significantly more complex than traditional grid-based games. I implemented complete game logic including turn handling, quadrant rotation, and win detection.",
    //         "One of the key challenges was maintaining real-time synchronization between players. I used Socket.io to handle room-based connections and ensure both players see consistent game states without lag or desync issues.",
    //         "On the frontend, I focused on smooth UI interactions and animations using Framer Motion, along with efficient state management using Zustand to handle complex game states cleanly.",
    //         "This project helped me gain strong experience in real-time systems, state management, and building interactive, performance-focused applications rather than static interfaces.",
    //       ],
    //     },
    //     {
    //       id: 2,
    //       name: "PentaGoOnline.com",
    //       icon: "/images/safari.webp",
    //       kind: "file",
    //       fileType: "url",
    //       href: "https://pentagoonline.vercel.app",
    //       position: "top-25 left-30",
    //     },
    //     {
    //       id: 4,
    //       name: "PentaGo Online.png",
    //       icon: "/images/image.png",
    //       kind: "file",
    //       fileType: "img",
    //       position: "top-60 right-20",
    //       imageUrl: "/images/pentagoonline.png",
    //     },
    //     {
    //       id: 5,
    //       name: "PentaGo Online.github",
    //       icon: "/images/plain.png",
    //       kind: "file",
    //       fileType: "fig",
    //       href: "https://github.com/SwastikSharma15/PentaGo-Online",
    //       position: "top-10 right-20",
    //     },
    //   ],
    // },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/me.jpeg",
    },
    {
      id: 2,
      name: "Nitesh.linkedin",
      icon: "/images/safari.webp",
      kind: "file",
      fileType: "url",
      href: "https://www.linkedin.com/in/nitesh000/",
      position: "top-60 left-50",
    },
    {
      id: 3,
      name: "Nitesh.github",
      icon: "/images/plain.png",
      kind: "file",
      fileType: "fig",
      href: "https://github.com/Nitesh000",
      position: "top-60 left-95",
    },
    {
      id: 4,
      name: "AboutMe.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-18 left-50",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/me.webp",
      description: [
        "I’m Nitesh, a frontend developer based in India, focused on building fast, responsive, and visually sharp web interfaces. I work mainly with React, JavaScript, Typescript, and modern tooling to craft smooth user experiences backed by clean, maintainable code.",
        "I care about performance, clarity, and UI polish whether it’s reducing load times, solving annoying UX problems. If something feels slow or clunky, I fix it. Simple.",
        "Outside coding, I love to play games. It keeps my brain younger. And BTW i use vim.",
      ],
    },
    {
      id: 5,
      name: "TechStack.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-10 left-95",
      subtitle: "Tech Stack",
      description: [
        "⚙️ Frontend:",
        "React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS",
        "",
        "🧠 State Management:",
        "Redux, Redux Toolkit, Zustand",
        "",
        "🛠️ Tools & Build Systems:",
        "Vite, npm, Git, GitHub, Axios, Jest, Figma",
        "",
        "📡 APIs & Data:",
        "REST APIs, JSON handling, Async data fetching",
        "",
        "📱 Other / Supporting:",
        "Python, SQL, React Native",
        "",
        "Other Languages:",
        "Rust, Go, Python",
      ],
    },
    {
      id: 6,
      name: "me2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-55 left-5",
      imageUrl: "/images/me.webp",
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 4,
      name: "Trash4.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-65 left-80",
      imageUrl: "/images/trash-4.jpg",
    },
    {
      id: 3,
      name: "Trash3.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-55 left-30",
      imageUrl: "/images/trash-3.jpg",
    },
    {
      id: 2,
      name: "Trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-20 left-55",
      imageUrl: "/images/trash-2.jpg",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  contact: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  resume: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  safari: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  photos: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  terminal: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  vscode: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  txtfile: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  imgfile: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  music: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  game: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  trash: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
