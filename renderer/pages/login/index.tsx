import { Button, FormControl, Input, InputLabel, styled } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ErrorMsg from "../../components/common/ErrorMessage";
import useUserAuth from "../../hooks/useUserAuth";
import { auth } from "../../lib/firebase/app";

const Root = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
  };
});

const Form = styled("form")(({ theme }) => {
  return {
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(2),
    gap: theme.spacing(4),
  };
});

const SignInPage = () => {
  const router = useRouter();
  const { signIn } = useUserAuth();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    const isLogin = await signIn(email, password);

    if (isLogin) {
      router.push("/home");
    } else {
      setErrorMsg("잘못된 아이디 또는 비밀번호입니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (auth.currentUser?.email) {
      router.push("/home");
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>채팅앱 - Login</title>
      </Head>
      <Root>
        <h2>로그인</h2>
        <Form onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl>
            <InputLabel>Password</InputLabel>
            <Input type="password" name="password" />
          </FormControl>
          <Button variant="contained" type="submit">
            로그인
          </Button>
        </Form>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <div>
          <span>아직 회원가입하지 않으셨나요?</span>
          <Link href="/signup">
            <Button>회원가입</Button>
          </Link>
        </div>
      </Root>
    </React.Fragment>
  );
};

export default SignInPage;
