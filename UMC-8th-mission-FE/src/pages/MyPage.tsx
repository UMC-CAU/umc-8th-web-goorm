//

import { useEffect, useState } from "react";
import { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // null 초기화로 타입 안전하게 설정
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response); // API 응답을 state에 저장
        console.log(response);
      } catch (error) {
        console.error("유저 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div>
      {/* 데이터가 존재할 때만 렌더링 */}
      {data ? (
        <>
          <h1>{data.data?.name}님 환영합니다.</h1>
          <img src={data.data?.avatar ?? ""} alt="구글 로고" />
          <h1>{data.data?.email}</h1>
        </>
      ) : (
        <p>정보를 불러오는 중입니다...</p>
      )}

      <button
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover-scale-90"
        onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
