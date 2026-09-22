document.querySelectorAll(".primary").forEach((button) => {
  button.addEventListener("click", () => {
    alert("أهلًا بيكي في Nor — دي نسخة تجريبية من الموقع.");
  });
});

document.querySelector(".ghost").addEventListener("click", () => {
  alert("تسجيل الدخول غير متاح في النسخة التجريبية.");
});

document.querySelector(".soft.big").addEventListener("click", () => {
  alert("الدردشة مع Nor غير متاحة حاليًا في النسخة التجريبية.");
});