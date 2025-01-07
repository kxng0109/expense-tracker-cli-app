const dateParser = (date) => (date < 10 ? `0${date}` : date);

const formatDate = (date) => {
    const d = dateParser(date.getDate());
    const m = dateParser(date.getMonth() + 1);
    return `${date.getFullYear()}-${m}-${d}`;
};

export { dateParser, formatDate };
