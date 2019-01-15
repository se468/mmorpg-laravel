## Day 3
> 목표: 리팩토링, 맵 레이어 및 충돌검사

저번시간까지는: 
* 캐릭터 캔버스에 그려주고 움직여주기
* 맵 만들기 툴만들기. 캐릭터 밑에 맵 그려주기.

**문제점:**
* 코드가 app.js 한 파일에 있다 - Refactoring 필요
* 맵이 fixed size - 맵 사이즈 다르게 해주기
* 맵이 한개의 레이어로 구성 - 맵에 여러 레이어 추가해주기 (캐릭터 밑, 캐릭터 위)
* 캐릭터가 바다 위나 장애물 위를 막 지나감 - 충돌검사 필요 
* 그외: 맵을 그리고 맵을 고치기가 너무 힘들다 - 맵 툴 추가 필요

###리팩토링

**자바스크립트**
[x] 글로벌 
 - GLOBAL.settings - 키 세팅 등등
 - GLOBAL.gameObjects - 캐릭터, 맵, 몬스터 등, z-index

[x] 게임 스크린을 Vue component 로 - Vue.js
[x] 캐릭터, 맵 클래스 만들기. character.js, map.js.
 - character.draw()
 - map.draw()

[x] 타일 그리기 - function

[x] variable naming

[x] character 클래스 global 에 대한 dependency 없애기 
[x] map 클래스 global 에 대한 dependency 없애기 

**라라벨**
[x] 맵 마다 사이즈 다르게 

### 맵 레이어
[x] 맵에는 많은 레이어가 필요함 (Map hasMany Layer)
 - 타일 레이어들 - 바닥레이어, 그 위 레이어 (나무 등), 캐릭터 위에 보이는 레이어 등
 - 이벤트 레이어 - 워프, NPC, 상자 등 - 다음시간에

[x] 캐릭터 위에 그리는 맵 레이어 정하기 (z-index)

### 맵 툴
[x] 지우개
[] 페인트 - floodfill
[] 사각형 
[] undo
[] redo

### 충돌검사 
[x] 벽, 물 등 걸어다니지 못하게
- Tileset 에 타일마다 충돌검사 지정
- 캐릭터가 움직이려고 하는 타일을 검사 - 모든 맵 레이어중 하나라도 non-walkable 타일이 있을경우 이동하지 못하도록 (bitwise AND)


### Github 에 Repository 만들기
[x] 소스 올리기 - https://github.com/se468/mmorpg-laravel

