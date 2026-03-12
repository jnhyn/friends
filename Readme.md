## 상황

목적: 효율적인 영어 대본 암기 및 단어 학습.
타겟: 모바일 환경(PWA)에서 출퇴근 시 학습하고자 하는 사용자.
핵심 기능: 시즌/에피소드별 대본 열람, 문장 및 단어 단위 북마크(저장), 학습 데이터 관리.
영어 공부를 위해 미국드라마 Friends 를 봤어.
재밌고 영어 표현도 너무 좋아서 영어 대본 공부를 하려고함.
영어공부할때는 또 대본을 통째로 외워버리는게 좋으니까.
마침 PWA로 모바일 전용 웹을 만들어서 출퇴근 할때 공부할계획.

## 기획의도
- 페이지는 2개 (scripts,memory)
- script 페이지는 대본들을 보여줌.
- memory 페이지는 암기하고싶은 대사,단어들을 보여줌.
- 등장인물의 이름을 클릭하면 : 해당 대사 전체 저장.
- 대사의 단어를 클릭하면 : 해당 단어 저장.

## UI 구성.

- overall: 모바일전용(Web)
- Top, Body,Bottom(Nav) 3개로 나뉨

### Top
- overall: 대본 제목, 을 알려주는 곳.
- 포지션 : 왼쪽 0px부터 오른쪽 쭉 채운 정직한 Top 느낌. (스크롤 시 Shy 하게 숨김처리.)
- Body 와 구분을 지어주세요.
- 스타일 : 
    - 배경 : 흰색
    - 글자색 : 검은색
    - 포인트 : 노란색
### Bottom
- overall: Scripts와 Memory 탭 이동 버튼.
- 포지션 : 하단부 고정(Fixed)
- Body 와 구분을 지어주세요.
- 스타일 : Fancy 해서 공부 할수있는 의지 불타게

### Body
- overall: 대본을 보여주는 영역 스크롤 가능 영역
- 스타일 : 
    - 배경 : 흰색
    - 글자색 : 검은색
    - 포인트 : 노란색

#### (Body) Scripts 페이지
- overall : Friens 의 회차는 Season10 개 각 시즌별로 20개 정도의 회차가 있음.
- Accordion UI 를 활용하여, Season10 개 노출 (기본 accordion 닫힘)
- Season 1을 클릭하면(toggle) 하위 Episode 가 Accordion 으로 펼쳐지는 형식.
- Episode 1을 클릭하면 'localhost:3000/scripts/s01/e01' 으로 이동합니다.
- 스타일 : 
    - 공부욕구를 끌어올리는 UI
    - 배경 : 흰색 계열(모두 흰색이지만 조금 이쁘게)
    - 글자색 : 검은색
    - 포인트 : 노란색

##### localhost:3000/scripts/s01/e01 화면
- overall : 제목과 대본.

아래 형식의 대본
- 등장인물: 대사
- 등장인물1: 대사1 

- 등장인물 click : 해당 대사 전체의 background color 가 옅은 회색으로 변경 (toggle)
    - 대사 저장 (등장인물 : 대사 저장되어집니다.)
- 대사의 단어 click : 해당 대사 의 단어를 클릭하면 color blue, 밑줄(blue) 됩니다 (toggle)
    - 단어 저장 (단어 저장되어집니다.)
    - Hello My Name Is 문장에서 Hello 를 클릭하면 Hello (Blue,밑줄) 되어집니다.

#### (Body) memory 페이지
- Filtering: 저장된 데이터(대사 또는 단어)가 있는 시즌/에피소드만 노출.
- overall : Script 페이지와 동일 한 UI Friens 의 회차는 Season10 개 각 시즌별로 20개 정도의 회차가 있음.
- Accordion UI 를 활용하여, Season10 개 노출 (기본 accordion 닫힘)
    - 단 저장이 되어있지않으면, 노출 하지 않음.
- 저장되어있는 대사,단어 가 있다면 Season 1을 클릭하면(toggle) 하위 Episode 가 Accordion 으로 펼쳐지는 형식.
- Episode 1을 클릭하면 'localhost:3000/memory/s01/e01' 으로 이동합니다.
- 스타일 : 
    - 공부욕구를 끌어올리는 UI
    - 배경 : 흰색 계열(모두 흰색이지만 조금 이쁘게)
    - 글자색 : 검은색
    - 포인트 : 노란색

##### localhost:3000/memory/s01/e01 화면
- overall : 제목과 저장해둔 단어, 대사.
- reset 버튼을 클릭해서 저장해둔 단어,대사 지울수 있는 버튼 

단어 는 글머리기호를 사용해서
- Hello
- My
- Name
- Is

대사는 
- 등장인물: 대사
- 등장인물1: 대사1 


### Tech Stack
Framework : Next.js (16.1+) App Router, typescript
State Management : Zustand
UI lirary : Shadcn
css: tailwind css
Ajax Library : Axios, react-query
Deployment: PWA
folder structure
```
/app
/src
|_components
   |_ui
   |_common   
|_features
|_utils
|_hooks
|_constants
/scripts-docs
```

### 대본 데이터는 어떻게 가져올것인가?
- 우선 hardcoding 데이터 이후 backend server 구축 예정.
- 대본 타입은 : JSON. 
    - 제목
    - Season
    - Episode
    - 본문
    (대본에는 가끔 상황설명을 위해 등장인물이 없는 구절도 있음)
    - 예시 : (this is an example)