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
