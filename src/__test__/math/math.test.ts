// math.test.js
import { expect, test } from "vitest";
import { add } from "./math";

// it === test

// AAA 패턴 미적용
// test("should summarize all number values in an array", () => {
//   const result = add([1, 2, 3]);
//   expect(result).toBe(6);
// });

/// AA 패턴 적용
test("should summarize all number values in an array", () => {
  // Arrange 테스트에서 사용할 테스트 환경과 변수를 정의
  const numbers = [1, 2, 3];

  // Act 테스트할 실제 코드 / 함수를 실행
  const result = add(numbers);

  // Assert 결과를 평가하는 단계. 예상하는 결과를 설정하고 어떤 결과가 성공인지 실패인지를 비교한다.
  const expectedResult = numbers.reduce((prev, curr) => prev + curr, 0);
  expect(result).toBe(expectedResult);
});