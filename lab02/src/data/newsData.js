export const generateNews = (startId = 1, count = 15) => {
  const categories = ['Технології', 'Наука', 'Спорт', 'Культура', 'Економіка'];
  const images = [
    'https://picsum.photos/seed/news1/400/250',
    'https://picsum.photos/seed/news2/400/250',
    'https://picsum.photos/seed/news3/400/250',
    'https://picsum.photos/seed/news4/400/250',
    'https://picsum.photos/seed/news5/400/250',
  ];

  return Array.from({ length: count }, (_, i) => {
    const id = startId + i;
    return {
      id: String(id),
      title: `Новина #${id}: ${categories[id % categories.length]}`,
      description:
        `Детальний опис новини #${id}. Це тестовий текст, який імітує реальний контент статті. ` +
        `Категорія: ${categories[id % categories.length]}. ` +
        `Тут розміщено повний зміст публікації з усіма подробицями події.`,
      image: images[id % images.length],
      date: new Date(Date.now() - id * 3600000).toLocaleDateString('uk-UA'),
      category: categories[id % categories.length],
    };
  });
};

export const initialNews = generateNews(1, 15);
