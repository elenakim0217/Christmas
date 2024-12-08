const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#27512e';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const showPresentBtn = document.getElementById('showPresentBtn');
const presentBoxImg = document.getElementById('presentBox');
let presentBtnClicked = false;

const showPresent = () => {
	presentBtnClicked = !presentBtnClicked;

	if (presentBtnClicked) {
		canvas.style.opacity = '0';
		presentBoxImg.style.cssText =
			'display: block; width: 1000px; height: 800px';
		showPresentBtn.textContent = '포장지를 확인해보자!';
	} else {
		presentBoxImg.style.display = 'none';
		canvas.style.opacity = '1';
		showPresentBtn.textContent = '선물 상자를 확인해보자!';
	}
};

showPresentBtn.addEventListener('click', showPresent);

drawWhiteSquare();

function drawWhiteSquare() {
	ctx.fillStyle = '#FFFFFF';
	const squareSize = 1000;
	const squareX = (canvas.width - squareSize) / 2;
	const squareY = 1300;
	ctx.fillRect(squareX, squareY, squareSize, squareSize);

	drawLayout(squareX, squareY, squareSize);
	drawIllustrations(squareX, squareY, squareSize);
	return squareY;
}

function drawLayout(x, y, size) {
	const cellSize = size / 4;
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 2;

	function getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	canvas.addEventListener('click', function (event) {
		const mouseX = event.offsetX;
		const mouseY = event.offsetY;

		// 클릭된 곳에 배경 색상을 랜덤으로 변경
		if (
			mouseX >= 320 &&
			mouseX <= 320 + 200 &&
			mouseY >= 925 &&
			mouseY <= 925 + 200
		) {
			ctx.fillStyle = getRandomColor(); // 랜덤 색상 적용
			ctx.fillRect(460, 1300, 250, 250); // 색상을 변경한 영역 다시 그리기

			// 별 9개 다시 그리기
			drawStarsInFirstCell(); // 별 패턴을 그리는 함수 호출
		}
	});
	// 최초 캔버스 그리기 (배경, 별 등)
	ctx.fillStyle = '#346b28';
	ctx.fillRect(460, 1300, 250, 250); // 첫 번째 칸 초기 배경색

	drawStarsInFirstCell(); // 첫 번째 칸에 별 9개 그리기
	ctx.strokeRect(x, y, cellSize, cellSize); //첫번째칸
	// 배경
	ctx.fillStyle = getRandomColor();
	ctx.fillRect(460, 1300, 250, 250);
	function drawStar(x, y) {
		ctx.font = '50px Arial';
		ctx.fillStyle = '#fff6de';
		ctx.fillText('*', x, y);
	}

	function drawStarsInFirstCell() {
		const startX = 456;
		const startY = 1320;
		const size = 250;
		const cellSize = size / 3;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				drawStar(
					startX + j * cellSize + cellSize / 2,
					startY + i * cellSize + cellSize / 2
				);
			}
		}
	}
	drawStarsInFirstCell();

	ctx.strokeRect(x + cellSize, y, cellSize * 2, cellSize); //2번째 칸ㄴ
	function draw2ndCellWithBackground(
		startX,
		startY,
		width,
		height,
		backgroundColor
	) {
		// 배경
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(startX, startY, width, height);
		// 나무
		const treeWidth = 120;
		const treeHeight = 100;
		const gap = 40;

		for (let i = 0; i < 3; i++) {
			const x =
				startX +
				(treeWidth + gap) * i +
				(width - (treeWidth * 3 + gap * 2)) / 2;
			const y = startY + (height - treeHeight * 2) / 3;
			drawSymmetricTree(x, y, treeWidth, treeHeight);
		}
	}

	function drawSymmetricTree(x, y, width, height) {
		ctx.fillStyle = '#fff6de';

		ctx.beginPath();
		ctx.moveTo(x + width / 2, y);
		ctx.lineTo(x, y + height);
		ctx.lineTo(x + width, y + height);
		ctx.closePath();
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(x + width / 2, y + height);
		ctx.lineTo(x, y + height * 2);
		ctx.lineTo(x + width, y + height * 2);
		ctx.closePath();
		ctx.fill();
	}
	draw2ndCellWithBackground(710, 1300, 500, 250, '#d82e00');
	ctx.strokeRect(x + cellSize * 3, y, cellSize, cellSize);
	function drawSquareGiftBox(startX, startY, size, boxColor, ribbonColor) {
		// 상자 배경
		ctx.fillStyle = boxColor;
		ctx.fillRect(startX, startY, size, size);
		const ribbonThickness = 20;
		ctx.fillStyle = ribbonColor;
		ctx.fillRect(
			startX,
			startY + size / 2 - ribbonThickness / 2,
			size,
			ribbonThickness
		);
		ctx.fillRect(
			startX + size / 2 - ribbonThickness / 2,
			startY,
			ribbonThickness,
			size
		);
	}
	drawSquareGiftBox(1210, 1300, 250, '#fff6de', '#d82e00');

	ctx.strokeRect(x, y + cellSize, cellSize * 2, cellSize);
	ctx.fillStyle = '#F5F5DC';
	ctx.fillRect(460, 1550, 500, 250);
	// 4번 칸 위치 및 크기 정의
	const fourthCellX = 497; // 4번 칸의 시작 X 좌표
	const fourthCellY = 1480; // 4번 칸의 시작 Y 좌표
	const fourthCellSize = 250; // 4번 칸 크기

	function drawSockInFourthCell() {
		const baseX = fourthCellX + fourthCellSize * 0.2; // 시작 X 좌표 (4번 칸 내 위치 조정)
		const baseY = fourthCellY + fourthCellSize * 0.3; // 시작 Y 좌표 (4번 칸 내 위치 조정)
		const sockWidth = fourthCellSize * 0.4; // 양말 몸통 너비
		const sockHeight = fourthCellSize * 0.6; // 양말 몸통 높이
		const circleRadius = sockWidth * 0.5; // 원의 반지름

		// 양말 몸통 (빨간색 사각형)
		ctx.fillStyle = '#d82e00'; // 빨간색
		ctx.fillRect(570, 1620, sockWidth, sockHeight);

		// 발 부분 (원)
		ctx.beginPath();
		ctx.fillStyle = '#d82e00'; // 빨간색
		ctx.arc(baseX + 20, baseY + sockHeight + 15, circleRadius, 0, Math.PI * 2); // 원 그리기
		ctx.fill();

		// 양말 위의 흰색 장식 (동그라미 4개)
		const decorationRadius = circleRadius * 0.4; // 장식 동그라미 크기
		const decorationGap = decorationRadius * 1.5; // 장식 간 간격
		const decorationY = baseY - decorationRadius; // 장식 Y 좌표

		ctx.fillStyle = '#FFFFFF'; // 흰색
		for (let i = 0; i < 4; i++) {
			ctx.beginPath();
			ctx.arc(
				baseX + 20 + decorationGap * i + 10,
				1615,
				decorationRadius,
				0,
				Math.PI * 2
			);
			ctx.fill();
		}
	}

	// 함수 호출하여 4번 칸에 그리기
	drawSockInFourthCell();

	// 5번 칸 위치 및 크기 정의
	const fifthCellX = 747; // 5번 칸의 시작 X 좌표 (4번 칸보다 오른쪽으로 이동)
	const fifthCellY = 1480; // 5번 칸의 시작 Y 좌표 (4번 칸과 동일)
	const fifthCellSize = 250; // 5번 칸 크기 (4번 칸과 동일)

	// 모양 그리기 함수
	function drawSockInCell(baseX, baseY, cellSize, bodyColor, decorationColor) {
		const sockWidth = cellSize * 0.4; // 양말 몸통 너비
		const sockHeight = cellSize * 0.6; // 양말 몸통 높이
		const circleRadius = sockWidth * 0.5; // 발 부분 원의 반지름

		// 양말 몸통 (사각형)
		ctx.fillStyle = bodyColor; // 사각형 색상
		ctx.fillRect(baseX, 1620, sockWidth, sockHeight);

		// 발 부분 (원)
		ctx.beginPath();
		ctx.fillStyle = bodyColor; // 원 색상
		ctx.arc(baseX, baseY + sockHeight + 15, circleRadius, 0, Math.PI * 2); // 원 그리기
		ctx.fill();

		// 양말 위의 장식 (동그라미 4개)
		const decorationRadius = circleRadius * 0.4; // 장식 동그라미 크기
		const decorationGap = decorationRadius * 1.5; // 장식 간 간격
		const decorationY = baseY - decorationRadius; // 장식 Y 좌표

		ctx.fillStyle = decorationColor; // 장식 색상
		for (let i = 0; i < 4; i++) {
			ctx.beginPath();
			ctx.arc(
				baseX + decorationGap * i,
				decorationY + 80,
				decorationRadius,
				0,
				Math.PI * 2
			);
			ctx.fill();
		}
	}
	// 5번 칸에 동일한 양말 그리기
	drawSockInCell(
		fifthCellX + fifthCellSize * 0.2, // 5번 칸 X 좌표
		fifthCellY + fifthCellSize * 0.3, // 5번 칸 Y 좌표
		fifthCellSize, // 5번 칸 크기
		'#346b28', // 양말 색상 (초록)
		'#FFFFFF' // 장식 색상 (흰색)
	);

	ctx.strokeRect(x + cellSize * 2, y + cellSize, cellSize, cellSize); //5번칸
	ctx.fillStyle = '#346b28';
	ctx.fillRect(x + cellSize * 2, y + cellSize, cellSize, cellSize);

	ctx.fillStyle = '#F5F5DC';
	ctx.fillRect(x + cellSize * 2 + 36, y + cellSize, 36, cellSize);
	ctx.fillStyle = '#F5F5DC';
	ctx.fillRect(x + cellSize * 2 + 107, y + cellSize, 36, cellSize);
	ctx.fillStyle = '#F5F5DC';
	ctx.fillRect(x + cellSize * 2 + 177, y + cellSize, 36, cellSize);

	ctx.strokeRect(x + cellSize * 3, y + cellSize, cellSize, cellSize); //6번칸
	ctx.fillStyle = '#d82e00';
	ctx.fillRect(x + cellSize * 3, y + cellSize, cellSize, cellSize);

	// 7번 칸 위치 및 크기 정의
	const seventhCellX = 1210; // 7번 칸 시작 X 좌표
	const seventhCellY = 1550; // 7번 칸 시작 Y 좌표
	const seventhCellSize = 250; // 7번 칸 크기

	// 랜덤 색상 생성 함수
	function getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	// 7번 칸 클릭 이벤트 처리
	canvas.addEventListener('click', function (event) {
		const mouseX = event.offsetX;
		const mouseY = event.offsetY;
		// 7번 칸 안에 클릭했을 때 배경색을 랜덤으로 변경
		if (
			mouseX >= 840 &&
			mouseX <= 840 + 200 &&
			mouseY >= 1080 &&
			mouseY <= 1080 + 200
		) {
			// 7번 칸의 배경을 랜덤 색으로 바꾸기 전에 기존에 그려진 원들을 지우기
			ctx.clearRect(
				seventhCellX,
				seventhCellY,
				seventhCellSize,
				seventhCellSize
			);

			/// 배경색 랜덤으로 설정
			ctx.fillStyle = getRandomColor();
			ctx.fillRect(
				seventhCellX,
				seventhCellY,
				seventhCellSize,
				seventhCellSize
			); // 7번 칸 배경 다시 그리기

			// 원 100개 그리기 (배경색 바뀌었을 때 다시 그려야 하므로 호출)
			drawOrderedCircles(
				seventhCellX,
				seventhCellY,
				11,
				11,
				6,
				23.3,
				'#F5F5DC'
			);
		}
	});

	// 정렬된 작은 원 그리기 함수
	function drawOrderedCircles(
		cellX,
		cellY,
		rows,
		cols,
		radius,
		spacing,
		circleColor
	) {
		ctx.fillStyle = circleColor; // 원 색상

		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				// 각 원의 중심 좌표 계산
				const x = cellX + col * spacing + radius; // X 좌표
				const y = cellY + row * spacing + radius; // Y 좌표

				// 원 그리기
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, Math.PI * 2);
				ctx.fill();
			}
		}
	}
	// 처음에 7번 칸 그리기
	ctx.fillStyle = '#346b28'; // 기본 배경색
	ctx.fillRect(seventhCellX, seventhCellY, seventhCellSize, seventhCellSize); // 7번 칸 배경

	// 7번 칸에 10 x 10 그리드로 원 100개 그리기
	const rows = 11; // 행 개수
	const cols = 11; // 열 개수
	const circleRadius = 6; // 원 반지름
	const spacing = 23.3; // 원 중심 간 간격 (반지름 포함)
	const circleColor = '#F5F5DC'; // 원 색상 (파란색)

	drawOrderedCircles(
		seventhCellX,
		seventhCellY,
		rows,
		cols,
		circleRadius,
		spacing,
		circleColor
	);
	ctx.strokeRect(x, y + cellSize * 2, cellSize, cellSize);
	ctx.strokeRect(x + cellSize, y + cellSize * 2, cellSize, cellSize);
	ctx.strokeRect(x + cellSize * 2, y + cellSize * 2, cellSize * 2, cellSize);

	ctx.strokeRect(x, y + cellSize * 3, cellSize * 2, cellSize);
	ctx.strokeRect(x + cellSize * 2, y + cellSize * 3, cellSize, cellSize);
	ctx.strokeRect(x + cellSize * 3, y + cellSize * 3, cellSize, cellSize);
}

function drawIllustrations(x, y, size) {
	const cellSize = size / 4;

	function getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	// 9번째 칸: 패턴 그리기
	const patternX = x;
	const patternY = y + cellSize * 2;
	drawPattern(patternX, patternY, cellSize, '#FF0000', '#F5F5DC');
	// 클릭 이벤트 처리
	canvas.addEventListener('click', function (event) {
		const mouseX = event.offsetX;
		const mouseY = event.offsetY;

		// 8번 칸 안에 클릭했을 때 배경색을 랜덤으로 변경
		if (
			mouseX >= 300 &&
			mouseX <= 300 + 200 &&
			mouseY >= 1260 &&
			mouseY <= 1260 + 200
		) {
			// 8번 칸의 배경을 랜덤 색으로 바꾸기 전에 기존에 그려진 패턴을 지우기
			ctx.clearRect(patternX, patternY, cellSize, cellSize);

			// 배경색 랜덤으로 설정
			ctx.fillStyle = getRandomColor();
			ctx.fillRect(patternX, patternY, cellSize, cellSize); // 8번 칸 배경 다시 그리기

			// 패턴 다시 그리기
			drawPattern(patternX, patternY, cellSize, '#FF0000', '#F5F5DC');
		}
	});

	// 10번째 칸: 눈사람 배치
	const snowmanX = x + cellSize;
	const snowmanY = y + cellSize * 2;
	drawSnowman(snowmanX, snowmanY, cellSize);

	// 11번째와 12번째 칸: 아가일 패턴 추가
	const combinedX = x + cellSize * 2;
	const combinedY = y + cellSize * 2;
	ctx.fillStyle = '#346b28';
	ctx.fillRect(combinedX, combinedY, cellSize * 2, cellSize);
	drawArgylePattern(combinedX, combinedY, cellSize * 2, cellSize);

	// 13번째와 14번째 칸: 스트라이프 무늬 추가
	const stripeX = x;
	const stripeY = y + cellSize * 3;
	ctx.fillStyle = '#346b28';
	ctx.fillRect(stripeX, stripeY, cellSize * 2, cellSize);
	drawStripePattern(stripeX, stripeY, cellSize * 2, cellSize);

	// 15번째 칸: 눈송이 그리기
	const snowflakeX = x + cellSize * 2;
	const snowflakeY = y + cellSize * 3;
	drawSnowflake(snowflakeX, snowflakeY, cellSize, '#F5F5DC');

	// 16번째 칸: 산타모자 배치
	const santaHatX = x + cellSize * 3;
	const santaHatY = y + cellSize * 3;
	drawSantaHat(santaHatX, santaHatY, cellSize);
	// 클릭 이벤트 처리
	canvas.addEventListener('click', function (event) {
		const mouseX = event.offsetX;
		const mouseY = event.offsetY;

		// 16번 칸 안에 클릭했을 때 배경색을 랜덤으로 변경
		if (
			mouseX >= 840 &&
			mouseX <= 840 + 200 &&
			mouseY >= 1440 &&
			mouseY <= 1440 + 200
		) {
			// 16번 칸의 배경을 랜덤 색으로 바꾸기 전에 기존에 그려진 도형들을 지우기
			ctx.clearRect(santaHatX, santaHatY, cellSize, cellSize);

			// 배경색 랜덤으로 설정
			ctx.fillStyle = getRandomColor();
			ctx.fillRect(santaHatX, santaHatY, cellSize, cellSize); // 16번 칸 배경 다시 그리기

			// 산타 모자 다시 그리기
			drawSantaHat(santaHatX, santaHatY, cellSize);
		}
	});
}

function drawPattern(x, y, size, patternColor, bgColor) {
	ctx.fillStyle = 'getRandomColor();';
	ctx.fillRect(x, y, size, size);

	ctx.fillStyle = patternColor;
	const dotRadius = size / 35;
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			ctx.beginPath();
			ctx.arc(
				x + (i + 0.5) * (size / 10),
				y + (j + 0.5) * (size / 10),
				dotRadius,
				0,
				Math.PI * 2
			);
			ctx.fill();
		}
	}
}

function drawSnowflake(x, y, size, color) {
	ctx.fillStyle = '#d82e00';
	ctx.fillRect(x, y, size, size);

	ctx.strokeStyle = color;
	ctx.lineWidth = 3;

	const centerX = x + size / 2;
	const centerY = y + size / 2;
	const radius = size / 4;

	for (let i = 0; i < 6; i++) {
		const angle = (Math.PI / 3) * i;
		const x1 = centerX + (Math.cos(angle) * size) / 3;
		const y1 = centerY + (Math.sin(angle) * size) / 3;

		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.lineTo(x1, y1);
		ctx.stroke();

		const detailX1 = x1 + (Math.cos(angle + Math.PI / 6) * radius) / 4;
		const detailY1 = y1 + (Math.sin(angle + Math.PI / 6) * radius) / 4;
		const detailX2 = x1 + (Math.cos(angle - Math.PI / 6) * radius) / 4;
		const detailY2 = y1 + (Math.sin(angle - Math.PI / 6) * radius) / 4;

		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(detailX1, detailY1);
		ctx.moveTo(x1, y1);
		ctx.lineTo(detailX2, detailY2);
		ctx.stroke();
	}
	ctx.restore();
}
// 애니메이션 루프
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화

	// 각 칸에 눈송이를 그리며 애니메이션
	for (let row = 0; row < 5; row++) {
		for (let col = 0; col < 5; col++) {
			const x = col * cellSize;
			const y = row * cellSize;
			const angle = (Date.now() / 1000) % (2 * Math.PI); // 시간에 따라 회전
			if ((row + col) % 2 === 0) {
				// 2x2 그리드 중 일부 칸에만 눈송이
				drawSnowflake(x, y, cellSize, '#FFFFFF', angle);
			} else {
				ctx.fillStyle = '#d82e00';
				ctx.fillRect(x, y, cellSize, cellSize); // 칸 배경 그리기
			}
		}
	}

	requestAnimationFrame(animate); // 애니메이션 반복
}

function drawSantaHat(x, y, size) {
	const baseX = x + size / 2;
	const baseY = y + size / 2;
	const triangleHeight = size / 2;

	ctx.fillStyle = 'getRandomColor();';
	ctx.fillRect(x, y, size, size);

	ctx.beginPath();
	ctx.moveTo(baseX, baseY - triangleHeight / 2);
	ctx.lineTo(baseX - size / 4, baseY + triangleHeight / 2);
	ctx.lineTo(baseX + size / 4, baseY + triangleHeight / 2);
	ctx.closePath();
	ctx.fillStyle = '#d82e00';
	ctx.fill();

	ctx.beginPath();
	ctx.ellipse(
		baseX,
		baseY + triangleHeight / 2,
		size / 4,
		size / 12,
		0,
		0,
		Math.PI * 2
	);
	ctx.fillStyle = '#FFFFFF';
	ctx.fill();

	ctx.beginPath();
	ctx.arc(baseX, baseY - triangleHeight / 2, size / 20, 0, Math.PI * 2);
	ctx.fillStyle = '#FFFFFF';
	ctx.fill();
}

function drawSnowman(x, y, size) {
	ctx.fillStyle = '#d82e00';
	ctx.fillRect(x, y, size, size);

	const radius1 = size / 3.5; // 아래쪽 원 크기
	const radius2 = radius1 * 0.7; // 중간 원 크기

	const centerX = x + size / 2; // 칸의 중심 X 좌표
	const centerY = y + size / 2.14 - size / 10; // 칸의 중심 Y 좌표를 위로 이동

	drawCircle(centerX, centerY + radius1, radius1, '#F5F5DC'); // 아래쪽 원
	drawCircle(centerX, centerY - radius2 + radius1 / 4, radius2, '#F5F5DC'); // 중간 원

	const eyeYOffset = radius2 / 6; // 눈을 더 아래로 이동
	drawCircle(
		centerX - radius2 / 3,
		centerY - radius2 - radius2 / 3 + radius1 / 4 + eyeYOffset,
		radius2 / 10,
		'#000000'
	);
	drawCircle(
		centerX + radius2 / 3,
		centerY - radius2 - radius2 / 3 + radius1 / 4 + eyeYOffset,
		radius2 / 10,
		'#000000'
	);

	// 중간 원에 입 그리기
	ctx.beginPath();
	ctx.arc(
		centerX,
		centerY - radius2 + radius2 / 3 + radius1 / 4,
		radius2 / 5,
		0,
		Math.PI,
		false
	);
	ctx.strokeStyle = '#000000';
	ctx.lineWidth = 3;
	ctx.stroke();
}

function drawCircle(x, y, radius, color) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function drawArgylePattern(x, y, width, height) {
	const diamondWidth = width / 6; // 다이아몬드 가로 크기
	const diamondHeight = height / 2; // 다이아몬드 세로 크기

	for (let row = 0; row < 2; row++) {
		for (let col = 0; col < 6; col++) {
			const offsetX = x + col * diamondWidth;
			const offsetY = y + row * diamondHeight;

			if ((row + col) % 2 === 0) {
				drawDiamond(offsetX, offsetY, diamondWidth, diamondHeight, '#d82e00');
			} else {
				drawDiamond(offsetX, offsetY, diamondWidth, diamondHeight, '#F5F5DC');
			}
		}
	}
}

function drawDiamond(x, y, width, height, color) {
	ctx.fillStyle = color;

	ctx.beginPath();
	ctx.moveTo(x + width / 2, y); // 위쪽
	ctx.lineTo(x + width, y + height / 2); // 오른쪽
	ctx.lineTo(x + width / 2, y + height); // 아래쪽
	ctx.lineTo(x, y + height / 2); // 왼쪽
	ctx.closePath();
	ctx.fill();
}
function drawStripePattern(x, y, width, height) {
	const stripeWidth = width / 12; // 스트라이프 너비

	for (let i = 0; i < 12; i++) {
		const offsetX = x + i * stripeWidth;

		// 홀수 스트라이프는 빨간색, 짝수 스트라이프는 아이보리색
		if (i % 2 === 0) {
			ctx.fillStyle = '#d82e00';
		} else {
			ctx.fillStyle = '#346b28';
		}

		ctx.fillRect(offsetX, y, stripeWidth, height);
	}
}
