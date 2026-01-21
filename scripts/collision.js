function checkCollision(main, target, type, i) {

	if (type === "player") {
		if (main.x > target.x && main.x < target.x + (target.w / 2)) {
			if (main.y >= target.y && main.y + main.y < target.y + target.h) {
				mouse.target = i
			}
		}
		if (main.x < target.x + target.w && main.x > target.x) {
			if (main.y >= target.y && main.y < target.y + target.h) {
				mouse.target = i
			}
		}
		if (main.y > target.y && main.y < target.y + target.h) {
			if (main.x >= target.x && main.x < target.x + (target.w / 2)) {
				mouse.target = i
			}
			if (main.x > target.x && main.x < target.x + target.w) {
				mouse.target = i
			}
		}
	}
}
