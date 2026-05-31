const rooms = new Map();
const getRoom = (id) => rooms.get(id);
const setRoom = (id, room) => rooms.set(id, room);
const deleteRoom = (id) => rooms.delete(id);
const getAllRooms = () => rooms;
module.exports = { getRoom, setRoom, deleteRoom, getAllRooms };
