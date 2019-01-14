# 2D (MMO) RPG 만들기
**소개**
- 게임개발 경험이 전무한 웹 개발자. 
- 항상 게임 개발을 해보고 싶었고 옛날에는 몇몇 시도도 해봤으나 완성작은 없음.
- 맨땅에 헤딩으로 게임개발 (MMORPG) 시도하기.

**기술 스텍**
- Laravel (PHP) 벡엔드
- HTML5 + Javascript 프론트엔드
- 게임엔진 X

> 인스톨 없이 브라우저 안에서 맥이나 리눅스에서도 접속해서 게임할수 있게 웹으로 제작

## Day 1
1. 이미지들 다운받기 (오픈소스)
2. 프로젝트 만들기 
3. 스크린에 캐릭터 그려보기

**이미지 출처 (Used Image Reference):**
https://www.deviantart.com/7soul1/art/420-Pixel-Art-Icons-for-RPG-129892453
http://finalbossblues.com/timefantasy/free-graphics/
https://github.com/makrohn/Universal-LPC-spritesheet

* * *
## Day 2
> 오늘의 목표: 캔버스에 맵 그리기

1. Tileset 만들기
2. Map 만들고 그리기

### 타일셋 만들기
**Tileset (or Sprite sheet)**
- 업로드 된 타일셋 이미지
- 이미지의 정보
    - 이미지 넓이 / 높이
    - horizontal_length (x축으로 이미지가 몇개)
    - vertical_length (y축으로 이미지가 몇개)
- type: 맵인가 캐릭터인가 다른것 (아이템등) 인가

- 캐릭터나 맵 이미지 모두 Tileset 으로 저장

**Tile**
- Tileset ID
- x, y
- 다른 여러가지 데이터 (예: mapTile 의 벽 같은경우 걸어다닐수 없다) [X]
### 맵 만들고 그리기
Map - 최소 두개의 레이어 필요
- 타일 레이어
- 이벤트 레이어(워프) [X]

Data 저장: 
2d array of objects
데이터베이스에  JSON 으로 저장

```
 col1  col2
-------------
|(0,0)|(1,0)| 1st row
-------------
|(0,1)|(1,1)| 2nd row
-------------

map = {
	data: [
		[
			mapTile, // 0,0 
			mapTile  // 1,0
		], // 1st row
		[
			mapTile, // 0,1
			mapTile  // 1,1
		], // 2nd row
	]
	tileset: TileSet
}

mapTile = {
	// tile
	// event (워프 등)
}
```

타일 이미지 출처: 
https://opengameart.org/content/lpc-tile-atlas
https://forums.rpgmakerweb.com/index.php?threads/ogedeis-asia-themed-content-updated-2018-07-14.58954/

* * *

## Day 3
> 목표: 리팩토링, 맵 레이어 및 충돌검사

###리팩토링

**자바스크립트**
[x] 글로벌 
 - GLOBAL.settings - 키 세팅 등등
 - GLOBAL.user - 캐릭터 정보 등

[x] 게임 스크린을 Vue component 로 
[x] 캐릭터, 맵 클래스 
 - character.draw(); 
 - map.draw();
 - 이런식으로 호출 가능하게

[x] 타일 그리기 - function

[x] variable naming

[x] character클래스 global 에 대한 dependency 없애기 
[x] map 클래스 global 에 대한 dependency 없애기 

**라라벨**
[x] 맵 마다 사이즈 다르게 

### 맵 레이어
[x] 맵에는 많은 레이어가 필요함 (Map hasMany Layer)
 - 타일 레이어들 - 바닥레이어, 그 위 레이어 (나무 등), 캐릭터 위에 보이는 레이어 등
 - 이벤트 레이어 - 워프, NPC, 상자 등

[x] 캐릭터 위에 그리는 맵 레이어 정하기 (z-index)

### 맵 툴
[x] 지우개
[] 페인트 
[] 사각형

### 충돌검사 
[x] 벽, 물 등 걸어다니지 못하게
- Tileset 에 타일마다 충돌검사 지정
