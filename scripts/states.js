const states = [
    {
        name: 'Калифорния',
        translation: 'California',
        codeName: 'ca',
        link: 'california',
        poster: 'california.jpg',
        posterTopLayer: 'california_top.webp',
        description: `
            Два уютных города с красивой архитектурой!
            Тут находится Мировой Суд, который решает споры и поддерживает порядок на сервере.
            Отличный выбор для тех, кто любит строить и быть рядом с другими!
        `,
        map: {
            image: 'ca.png',
            x: 0,
            z: 4000,
            link: 'https://map.demovio.lol/#overworld:18:14:4194:395:0:0:0:1:flat'
        }
    },
    {
        name: 'Шанхай',
        translation: 'Shanghai',
        codeName: 'sh',
        link: 'shanghai',
        poster: 'shanghai.webp',
        posterTopLayer: 'shanghai_top.webp',
        description: `
            Этот город-штат — идеальное место для бизнеса!
            Здесь легко разместить свой завод с механизмами Create.
            Забудьте о хлопотах с постройкой дома — приезжайте и бесплатно получите своё жильё!
        `,
        map: {
            image: 'sh.png',
            x: -1000,
            z: 4000,
            link: 'https://map.demovio.lol/#overworld:-534:40:4120:224:0:0:0:1:flat'
        }
    },
    {
        name: 'Нью Йорк',
        translation: 'New York',
        link: 'newyork',
        codeName: 'ny',
        poster: 'newyork.webp',
        posterTopLayer: 'newyork_top.webp',
        description: `
            На его территории находится одноимённый город Нью Йорк –
            столица инноваций. Самый высокий небоскреб – World Trade Center, располагается именно здесь!
        `,
        map: {
            image: 'ny.png',
            x: 2000,
            z: 4000,
            link: 'https://map.demovio.lol/#overworld:1748:0:4049:514:0:0:0:1:flat'
        }
    },
    {
        name: 'Огайо',
        translation: 'Ohio',
        codeName: 'oh',
        link: 'ohio',
        poster: 'ohio.webp',
        description: `
            Огайо 💀. Полная творческая свобода! Один из штатов, где проходят выборы –
            возможно, именно вы станете мэром!
        `,
        map: {
            image: 'oh.png',
            x: 0,
            z: 0,
            link: 'https://map.demovio.lol/#overworld:1895:61:3888:187:0:0:0:1:flat'
        }
    },
    {
        name: 'Джорджия',
        translation: 'Georgia',
        codeName: 'ge',
        link: 'georgia',
        poster: 'georgia.webp',
        description: `
            Для тех, кто ценит настоящую свободу.
            Здесь вы можете строить всё, что захотите, наслаждаясь простотой оформления гражданства
            и равными условиями для всех. Самый большой и свободный штат ждёт вас!
        `,
        map: {
            image: 'ge.png',
            x: 0,
            z: 0,
            link: 'https://map.demovio.lol/#overworld:1029:0:4230:610:0:0:0:1:flat'
        }
    },
];

export { states };