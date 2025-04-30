export const getDataObject = (key) => {
    const saved = localStorage.getItem(key);
    const data = saved ? JSON.parse(saved) : null;
    return data;
}