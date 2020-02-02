[TOC]

# 프로젝트

### WHY?

내가 얼마나 열심히 git활동을 했는지 보여주는 github의 잔디.. 하지만 어느 순간부터 내가 활동을 해서 잔디가 심어지는게 아니라 잔디를 심기 위해 활동을 하게 된다. 잔디 심기 위해서 활동을 한다고 생각하면 뭔가 이상할 수도 있겠지만, 난 나름 잔디가 공부하는데 동기부여가 된다고 생각한다. 여기서 우리가 개발 공부를 하는데 잔디처럼 동기부여를 줄 수 있는게 있다면 어떨까라고 생각했다. 여기서 개발 공부란 git 활동뿐만 아니라 cs, 알고리즘까지 모두.. 이러한 공부를 진행하면 잔디를 심듯이 내가 한 활동들의 결과를 시각화해서 보여주는 것이다. 이러한 생각을 시작으로 서비스를 만들어보자는 생각을 했다. 



### WHAT?

그렇다면 해당 서비스에서 어떤 기능을 제공하면 좋을까 막 던져보자

- [x] 회원가입/로그인
- [x] 개인페이지
- [x] 랭킹 시스템
- [ ] 자신의 git 연동
- [ ] 알고리즘 학습 그래프
- [ ] cs 학습 그래프
- [x] 레벨? 등급? 티어?
- [ ] 학습 시간 그래프
- [ ] 각 학습 당 뱃지?
- [ ] 게시판 
- [ ] TODO 리스트



# 기술스택

### backend : `express`

nodeJS의 표준 서버 프레임워크로 인정받고 있는 `express` 를 이용하여 백엔드 서버를 개발할 예정이다. SSAFY 교육생 때, 마지막 심화 프로젝트를 진행하면서 혼자서 express를 이용하여 백엔드 서버를 개발하면서 다양한 기능을 구현해봤기 때문에 익숙한 툴이다. 또한 프론트엔드를 javascrpit로 개발해야하기 때문에 서로 다른 언어를 사용하기보다는 프론트엔드와 백엔드 모두 javascrpit로 개발할 수 있는 편의성을 위하여 express로 백엔드를 개발하기로 결정했다.



### frontend : `vanillaJS`

프론트엔드를 개발하면서 다양한 프레임워크를 사용할 수 있지만, 모든 프레임워크의 기본은 `vanillaJS` 이다. 본래 기본적인 vanillaJS를 하면서 겪었던 불편함을 해결하기 위해 프레임워크를 시도하는 것이지만, 처음부터 프레임워크를 사용했기 때문에 이 프레임워크를 사용하면서 얻는 이점이 무엇인지 모르고 있다. 따라서 기본인 vanillaJS를 이용하면서 javascript 자체에 대핸 이해도를 높이면서, 프레임워크 사용이 무슨 이점이 있는지를 몸으로 느끼기 위해 선택했다.

사실 SSAFY 교육생 시절 프로젝트를 진행하면서 vue를 써봐서 프로젝트를 진행하는데 있어서 익숙하게 사용할 수 있어서 편하게 프로젝트를 진행하기에는 vue가 최적이었다. 또한 현재 react에 대해 간단히 배우면서 실습 경험을 늘리기 위해 react도 시도해보고 싶긴 했다. 하지만 vanillaJS를 통해 프론트엔드를 개발해보면 많은 것을 배울 수 있을 것이라는 컨설턴트님의 말씀에 따라서 vanillaJS로 프론트엔드를 개발하기로 결정했다.



### DB: `MongoDB`

그동안 DB로 SQLite, MySQL을 사용해 봤다. 그런데 친구가 프로젝트를 진행하면서 MongoDB를 사용해봤고, Nosql도 매우 편리한 점이 있다고 말해주었다. (Array를 사용할 수 있다는 것) 이에 언제 한 번 Nosql를 사용해보고 싶다는 생각을 가지고 있었다. 그러다 이번 프로젝트를 진행하면서 Nosql을 사용하는 것을 고민해봤다. 때마침 해당 프로젝트를 진행하는데 있어서 RDBMS를 사용하는 것보다 nosql을 사용하는 것이 훨씬 좋을 것이라는 판단이 섰다. 이로  인해 DB를 MongoDB를 사용하기로 결정하고 이에 대해 공부했고, 역시나 RDBMS를 이용하는 것보다 Nosql이 적합했다는 생각이 든다. (아직까지는..)



### server: `AWS`

딱히.. 다른 선택지는 모르기도하고... 그동안 진행했던 프로젝트를 AWS에 올리는 것이 엉성하게 진행된 것 같다는 생각에 이번엔 제대로 차근차근 배워서 AWS에 서버를 올리고 싶다.



## Model

### User

|      field      |   type   | example                                         |
| :-------------: | :------: | :---------------------------------------------- |
|       _id       | ObjectId | 5e36806e6693471c4c94a116                        |
|      email      |  String  | mnoko@kakao.com                                 |
|    password     |  String  | abcd1234                                        |
|    nickName     |  String  | mnoko                                           |
|     profile     |  String  | https://faculty.nps.edu/dl/ced3/img/team/NO.png |
|      score      |  Number  | 0                                               |
|      last       |  String  | 20190201                                        |
|   continuous    |  Number  | 0                                               |
|      rank       |  String  | unranked                                        |
|    threshold    |  Number  | 1                                               |
|    nextRank     | ObjectId | 4e36806e6693422c4c94a116                        |
| boj_problem_set |  Array   | [ { _id, pb_id, pb_name, pb_difficulty  } ]     |
|  rank_history   |  Array   | [ { created_at, score, rank  } ]                |
|      badge      |  Array   | [ { badgeImg, badgeContent } ]                  |



### Problem

|      field      |   type   | example                  |
| :-------------: | :------: | ------------------------ |
|       _id       | ObjectId | 4e36806e6693422c4c94a116 |
|      pb_id      |  Number  | 1000                     |
|     pb_name     |  String  | A+B                      |
|  pb_trial_cnt   |  Number  | 79880                    |
| pb_success_cnt  |  Number  | 248529                   |
| pb_success_rate |  Number  | 44.988                   |
|  pb_difficulty  |  String  | normal                   |
|    pb_source    |  String  | BOJ                      |



### Rank

| field     | type     | example                                         |
| --------- | -------- | ----------------------------------------------- |
| _id       | ObjectId | 4e36806e6693422c4c94a116                        |
| rankName  | String   | unranked                                        |
| rankMark  | String   | U                                               |
| rankImg   | String   | https://faculty.nps.edu/dl/ced3/img/team/NO.png |
| threshold | Number   | 1                                               |
| nextRank  | ObjectId | 4e36806e6693422c4c94a117                        |





## ETC

### 문제 Difficulty 측정

| pb_trial_cnt         | pb_success_rate | Difficulty     | Score                        |
| -------------------- | --------------- | -------------- | ---------------------------- |
| pb_trial_cnt < 1000  | -               | Lack of Sample | + int(100 - pb_success_rate) |
| pb_trial_cnt >= 1000 | 100 >= x > 90   | Practice       | +5                           |
|                      | 90 >= x > 70    | Very Easy      | +10                          |
|                      | 70 >= x > 50    | Easy           | +100                         |
|                      | 50 >= x > 35    | normal         | +300                         |
|                      | 35 >= x > 20    | Hard           | +1000                        |
|                      | 20 >= x > 5     | Very Hard      | +5000                        |
|                      | 5 >= x          | Hell           | +50000                       |



### 연속 문제 해결에 대한 가중치

| Difficulty     | 5 > c | 10 > c >= 5 | 30 > c >= 10 | c >= 30 |
| -------------- | ----- | ----------- | ------------ | ------- |
| Lack of Sample | + c%  | + c%        | + c%         | + 100   |
| Practice       | + 1   | + 3         | + 5          | + 10    |
| Very Easy      | + 1   | + 5         | + 7          | + 15    |
| Easy           | + c   | + 10 * c    | + 150        | + 200   |
| normal         | + c%  | + c%        | + c%         | + c%    |
| Hard           | + 10% | + 50%       | + 100%       | + 200%  |
| Very Hard      | + 10% | + 50%       | + 100%       | + 200%  |
| Hell           | + 10% | + 50%       | + 100%       | + 200%  |



