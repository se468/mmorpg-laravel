## Day 4
> 목표: 캐릭터 걷는 애니메이션 추가하기, 캐릭터에 옷 입혀보기, 몬스터 추가하기, 간단한 전투 시스템

**문제점:**
- 캐릭터가 움직일떄 모션이 없다 (순간이동 처럼 이동)
- 캐릭터가 옷/무기를 안입고 있다
- 캐릭터가 공격을 못함
- 몬스터 없음

### 캐릭터 애니메이션
[x] 캐릭터 움직일때 애니메이션 넣기
[x] 공격 모션 넣기
- Keyboard input 후 update method 에서 현재 애니메이션을 업데이트 해줌
- 캐릭터의 STATE 에 따른 애니메이션 (IDLE, MOVING, ATTACKING 등)

### 캐릭터 장비 그려주기
[x] 장비 타입 - 일단 hair, feet, legs, weapons, torso - 나중에 추가 가능하게

### 몬스터
[x] 몬스터 만들기 - character 의 subclass
[x] 몬스터 공격하기 및 몬스터의 반격
[x] COMBAT state 만들기

### State Management
[x] IDLE,MOVING,ATTACKING,IN_COMBAT,DYING,DEAD

IDLE -> IN_COMBAT : 가만히 있다가 공격 당했을경우. target 이 죽으면 다시 IDLE.
IDLE -> MOVING : move() 함수 호출된 경우. 끝나면 다시 IDLE
IDLE 또는 IN_COMBAT -> ATTACKING: attack() 함수 호출된경우. 끝나면 IN_COMBAT 으로.
IN_COMBAT->DYING: die() 함수 호출된경우. takeDamage() 에서 hp 가 0 이하로 떨어진경우. 
DYING -> DEAD : DYING 애니메이션이 끝난경우.

### 맵 레이어 파일로 저장
[x] 큰 맵을 서포트 하기 위해 데이터베이스 대신 파일로 저장

### 맵메이커
[x] 페인트툴
[] 사각형 툴

### MVC
[x] display.js (class Display (canvas)) - 캔버스 draw 로직
- characterDraw
- mapDraw
- tilesetDraw

model.js - stores data like game objects and map data