document.getElementById("theme-toggle").addEventListener("click", function() {
	document.body.classList.toggle("dark-theme");
	[...document.querySelectorAll("h2, p")].forEach(element => {
		element.classList.toggle("dark-theme");
	});
});