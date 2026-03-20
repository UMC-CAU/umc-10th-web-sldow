export function setupInput(input, addFn) {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const text = input.value.trim();
      if (text !== "") {
        addFn(text);
        input.value = "";
      }
    }
  });
}
