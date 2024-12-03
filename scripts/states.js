const states = [
    {
        name: 'Калифорния',
        translation: 'California',
        codeName: 'ca',
        poster: 'california.jpeg',
        description: `
            Поделён на два города (Аури и Киото) и включает в себя Мировой Суд,
            который решает споры и поддерживает порядок на сервере.
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
        poster: 'shanghai.jpeg',
        posterTopLayer: 'shanghai_top.png',
        description: `
            Город с правами штата. Ваш новый дом и идеальное место для бизнеса! 
            Здесь всё готово для размещения малых и средних заводов Create.
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
        codeName: 'ny',
        poster: 'newyork.jpeg',
        description: `
            На его территории находится одноимённый город Нью Йорк –
            столица инноваций. Самый высокий небоскреб – World Trade Center, располагается именно здесь!
        `,
        map: {
            image: 'ny.jpeg',
            x: 2000,
            z: 4000,
            link: 'https://map.demovio.lol/#overworld:1748:0:4049:514:0:0:0:1:flat'
        }
    },
    {
        name: 'Огайо',
        translation: 'Ohio',
        codeName: 'oh',
        poster: 'ohio.jpeg',
        description: `
            Описание согласовывается с администрацией.
        `,
        map: {
            image: 'oh.jpeg',
            x: 0,
            z: 0,
            link: 'https://map.demovio.lol/#overworld:1895:61:3888:187:0:0:0:1:flat'
        }
    },
    {
        name: 'Джорджия',
        translation: 'Georgia',
        codeName: 'ge',
        poster: 'georgia.jpeg',
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