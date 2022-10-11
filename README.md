# CUPIST 사전과제 작업 - 최권준

## React Native CLI와 TypeScript 사용
- useState와 Redux를 이용한 상태관리
- Redux-Saga를 이용한 API 통신
- 적절한 모듈화

- 공통(Common)
    - CustomText, CustomButton
        - 텍스트와 버튼을 모듈화하여 효율적인 작업을 가능하게 함
    - Header
        - 공통으로 많이 쓰이는 헤더는 따로 모아서 관리
        - 사전과제에서는 하나의 헤더밖에 없지만 많은 종류의 헤더를 손쉽게 사용할수 있도록 구현
    - Color
        - 자주 사용하는 컬러를 따로 모아두어 편리성을 높임
          
     <img width="172" alt="스크린샷 2022-10-10 오후 10 44 16" src="https://user-images.githubusercontent.com/89247938/194880429-78caf234-ad62-4bfc-9488-3c8fc8d10fb8.png">


- 홈화면(HomeScreen)

  <img width="252" alt="스크린샷 2022-10-10 오후 11 06 00" src="https://user-images.githubusercontent.com/89247938/194884810-376f6f38-8cf5-4824-aa7d-72d54c993b01.png"><img width="256" alt="스크린샷 2022-10-10 오후 11 06 58" src="https://user-images.githubusercontent.com/89247938/194885061-24af462a-4146-40f4-af93-620f1b5ae3ab.png">


- 목록 불러오기 : useEffect를 이용해 최초에 카드목록 불러와 화면에 뿌려줌
- 목록 추가 불러오기 : flatList의 onEndReached 속성을 이용해 목록 끝에 접근했을때 목록 추가 호출
- 선택항목 삭제 : 리듀서를 이용한 상태관리로 해당 항목 즉시 삭제되도록 구현
- 새로고침 기능 : FlatList의 onRefresh 속성을 이용해 API를 재호출하는 기능 구현

- 프로필 수정(ProfileScreen)


<img width="257" alt="스크린샷 2022-10-10 오후 11 08 34" src="https://user-images.githubusercontent.com/89247938/194885441-f42a59b3-5a01-4766-87e1-5a049c52a4e0.png"><img width="254" alt="스크린샷 2022-10-10 오후 11 09 15" src="https://user-images.githubusercontent.com/89247938/194885558-edec679c-87b6-4793-9970-ea9f98d5b7c0.png"><img width="254" alt="스크린샷 2022-10-10 오후 11 10 27" src="https://user-images.githubusercontent.com/89247938/194885809-76cd9e38-6aa1-4013-ae9e-1a8a3cfb3049.png">


- 최초회면 접근시 프로필 API 호출해서 데이터 매핑
    - 데이터가 없는 컬럼의 경우 빈값 또는 명시되어있는 텍스트로 대치
- 선택 다이얼로그 모듈화 (SelectDialog)
    - 세개의 다이얼로그가 형태가 비슷해서 상단 문구와, 목록데이터, 높이값을 받아서 처리하는 모듈로 정리
- Profile의 타입을 지정해 데이터 매핑 등에 용이하도록 사용
  
<img width="320" alt="스크린샷 2022-10-10 오후 11 22 17" src="https://user-images.githubusercontent.com/89247938/194888236-06cdcee7-9ab3-4d74-b2f2-bf592b24e34d.png">

- 기타 화면 디자인적인 부분은 디자인 가이드라인에 따라 제작하였습니다.

>> 작업한거 정리하면서 다시보니 이미지 카드나 TextInput 같은 부분도 모듈화 할 수 있었을것같은데 미리 보지 못한게 아쉬운 부분입니다.
>> 테스트를 안드로이드 폰으로밖에 진행하지 못해 ios에서의 디자인 깨지는 부분들은 확인하지 못했습니다. 평가에 참고부탁드립니다!! 감사합니다~!
  
 
