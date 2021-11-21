# kick-kick-main-server

Kick Kick Main Server

## How to Run

```shell
  npm install # To install dependencies in package.json
  npm run install # To install Dev Modules (Nodemon, ... etc) 
  npm run dev # Run in dev mode (Using nodemon)
```

## How to Run - Flask Server

```shell
  python -m venv .venv

  .\.venv\Scripts\activate.bat # windows cmd

  or 

  .\.venv\Scripts\activate.ps1 # windows power shell

  pip install -r .\requirements.txt
  python .\app.py
```

## How to Deploy

You can deploy automatically via push or pull request to Master Branch.

## Key 목록

|index|content|data|
|:---:|:-----:|:--:|

## POSTMAN

[link_to_Postman][link_to_Postman]

## API 목록 (Deprecated)

|index|content|url|
|:---:|:-----:|:-:|
|1|카메라 목록 조회|/camera|
|2|카메라 등록 & 연결|/camera/register|
|3|카메라 삭제|/camera/delete|
|4|회원가입|/user/signup|
|5|로그인|/user/signin|
|6|계정탈퇴|/user/signout or /user/withdrawl|
|7|검출 내역 확인|/detected/system|

## Contributors

[Ryunos96][link_to_Ryunos96]
[GGULBAE][link_to_GGULBAE]

[link_to_Ryunos96]: https://github.com/Ryunos96
[link_to_GGULBAE]: https://github.com/GGULBAE
[link_to_Postman]: https://app.getpostman.com/join-team?invite_code=9ac83a20de3c278a6ea437db2661aec9&ws=4cb79c36-f55f-49fe-96cf-1c28246aa4e8
