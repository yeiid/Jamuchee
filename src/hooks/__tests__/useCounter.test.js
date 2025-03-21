import { renderHook, act } from "@testing-library/react";
import useCounter from "../useCounter";

describe("useCounter hook", () => {
  test("debe inicializar con el valor por defecto", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  test("debe inicializar con el valor proporcionado", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  test("debe incrementar el contador", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test("debe decrementar el contador", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  test("no debe decrementar por debajo de cero", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(0);
  });

  test("debe resetear el contador al valor inicial", () => {
    const { result } = renderHook(() => useCounter(3));

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(5);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(3);
  });
});
