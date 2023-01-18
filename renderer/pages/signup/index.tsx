import { Button, FormControl, Input, InputLabel, styled } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ErrorMsg from "../../components/common/ErrorMessage";
import useUserAuth from "../../hooks/useUserAuth";

const Root = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(4),
  };
});

const Form = styled("form")(({ theme }) => {
  return {
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(4),
    gap: "30px",
  };
});

const SignupPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const { signUp } = useUserAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      confirmPassword: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;
    const confirmPassword = target.confirmPassword.value;

    if (email === "" || password === "") {
      setErrorMsg("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    const checkSignUp = await signUp(email, password);

    if (checkSignUp === "success") {
      router.push("/login");
    } else {
      if (checkSignUp === "auth/unknown-error") {
        setErrorMsg(
          "알 수 없는 이유로 회원가입에 실패하셨습니다. 다시 시도해주세요."
        );
        return;
      }
      if (checkSignUp === "auth/weak-password") {
        setErrorMsg("비밀번호는 6자 이상이어야 합니다.");
        return;
      }
      if (checkSignUp === "auth/email-already-in-use") {
        setErrorMsg("이미 존재하는 이메일입니다.");
        return;
      }
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>채팅앱 - Signup</title>
      </Head>
      <Root>
        <h2>회원가입</h2>
        <Form onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input type="email" name="email" autoFocus />
          </FormControl>
          <FormControl>
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              name="password"
              placeholder="6자리 이상의 비밀번호"
            />
          </FormControl>
          <FormControl>
            <InputLabel>Confirm Password</InputLabel>
            <Input type="password" name="confirmPassword" />
          </FormControl>
          <Button variant="contained" type="submit">
            회원가입
          </Button>
        </Form>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <div>
          <span>이미 회원가입하셨나요?</span>
          <Link href="/login">
            <Button>로그인</Button>
          </Link>
        </div>
      </Root>
    </React.Fragment>
  );
};

export default SignupPage;
