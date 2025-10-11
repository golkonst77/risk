### To-dos

- [x] Удалить modules/auth/* и все импорты
- [x] Удалить app/login, app/register, app/lk страницы
- [x] Удалить test/debug Supabase API роуты
- [x] Очистить lib/settings-store.ts от Supabase, оставить локальные данные
- [x] Создать lib/local-data.ts с readJson()
- [x] Перевести app/api/reviews на data/local-reviews.json
- [x] Перевести app/api/homepage-sections на data/homepage-sections.json
- [x] Перевести app/api/homepage и settings на data/homepage.json
- [x] Перевести app/api/coupons на data/coupons.json
- [x] Во всех остальных app/api вернуть 501 для записи (часть уже отключена)
- [x] Удалить все импорты @supabase/supabase-js и createClient
- [x] Удалить @supabase/supabase-js из package.json
- [ ] Проверить dev-сборку и основные маршруты

Осталось застабить (501) полностью:
- app/api/newsletter/campaigns/[id]/send/route.ts
- app/api/get-checklist/route.ts
- app/api/user/profile/route.ts
- app/api/debug-checklists/route.ts
- app/api/newsletter/sync-sendsay/route.ts
