export const calculateProgess = todos => todos.filter(t => t.isCompleted).length / todos.length;