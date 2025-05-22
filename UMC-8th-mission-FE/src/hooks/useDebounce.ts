import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  //value, delay가 변경될 때마다 실행
  useEffect(() => {
    //delay 후에 실행한다.
    //delay 시간 후에 value를 debouncedValue로 업데이트하는 타이머를 시작한다.
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    //value가 변경되면 기존 타이머를 지워서 업데이트를 취소한다.=>(같이배우는리액트-02 useEffect 부수효과를 처리하는 방법) 영상 참고
    //,값이 계속 바뀔 떄마다 마지막에 멈춘 값만 업데이트 된다.
    return () => clearTimeout(handler); //클린업 함수
  }, [value, delay]);

  //최종적으로 잠시 기다린 후의 값을 반환한다.

  return debouncedValue;
}

export default useDebounce;

//500ms 후에 동작하게 함
