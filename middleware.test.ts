import { middleware } from "./middleware"; // middleware dosyanın gerçek yolu
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

jest.mock("next-auth/jwt");
jest.mock("next/server", () => {
  return {
    NextResponse: {
      next: jest.fn(() => "next_response_mock"),
      redirect: jest.fn((url: URL) => ({
        status: 307,
        headers: {
          get: (key: string) => {
            if (key === "location") {
              return url.pathname;
            }
            return null;
          },
        },
      })),
    },
  };
});

describe("middleware", () => {
  const mockRequest = {
  url: "http://localhost/dashboard",
  nextUrl: {
    clone() {
      return new URL("http://localhost/dashboard");
    },
    pathname: "/dashboard",
  },
} as any;


  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("token yoksa /login sayfasına yönlendirme yapar", async () => {
    (getToken as jest.Mock).mockResolvedValue(null);

    const response = await middleware(mockRequest);

    expect(getToken).toHaveBeenCalled();

    expect(NextResponse.redirect).toHaveBeenCalled();

    const redirectArg = (NextResponse.redirect as jest.Mock).mock.calls[0][0];
    expect(redirectArg).toBeInstanceOf(URL);
    expect(redirectArg.pathname).toBe("/login");

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("/login");
  });

  it("token varsa isteğe devam eder", async () => {
    (getToken as jest.Mock).mockResolvedValue({ user: "testuser" });

    const response = await middleware(mockRequest);

    expect(getToken).toHaveBeenCalled();
    expect(NextResponse.next).toHaveBeenCalled();
    expect(response).toBe("next_response_mock");
  });
});
