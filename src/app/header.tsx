import { Menu } from "./menu";
import { UserMenu } from "./user-menu.tsx";

export function Header() {
  const storeCode = "B001";
  const storeName = "テスト店舗";

  return (
    <header>
      <div className="border-b">
        <div className="container mx-auto px-4 min-h-14 items-center grid sm:grid-cols-[1fr_auto]">
          <div className="flex">
            <h1 className="text-xl font-bold">品出しリスト</h1>
            <UserMenu userName="テストユーザー" />
          </div>
          <Menu />
        </div>
      </div>
    </header>
  );
}
