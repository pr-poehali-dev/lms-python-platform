import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type Section = "home" | "profile" | "courses" | "docs" | "leaderboard" | "shop";

const navItems = [
  { id: "home" as Section, label: "Главная", icon: "LayoutDashboard" },
  { id: "profile" as Section, label: "Мой профиль", icon: "User" },
  { id: "courses" as Section, label: "Курсы", icon: "BookOpen" },
  { id: "docs" as Section, label: "Документация", icon: "FileText" },
  { id: "leaderboard" as Section, label: "Лидерборд", icon: "Trophy" },
  { id: "shop" as Section, label: "Магазин", icon: "ShoppingBag" },
];

const courses = [
  { id: 1, title: "Основы TypeScript", category: "Программирование", progress: 100, duration: "8 ч", lessons: 24, completed: true },
  { id: 2, title: "React для продакшена", category: "Frontend", progress: 68, duration: "12 ч", lessons: 36, completed: false },
  { id: 3, title: "Дизайн-системы", category: "UI/UX", progress: 32, duration: "6 ч", lessons: 18, completed: false },
  { id: 4, title: "PostgreSQL глубоко", category: "Базы данных", progress: 0, duration: "10 ч", lessons: 30, completed: false },
  { id: 5, title: "Python и ML", category: "Data Science", progress: 0, duration: "16 ч", lessons: 48, completed: false },
  { id: 6, title: "CI/CD и DevOps", category: "Инфраструктура", progress: 100, duration: "5 ч", lessons: 15, completed: true },
];

const leaderboard = [
  { rank: 1, name: "Алексей Морозов", points: 4820, courses: 12, avatar: "АМ" },
  { rank: 2, name: "Мария Соколова", points: 4210, courses: 10, avatar: "МС" },
  { rank: 3, name: "Дмитрий Волков", points: 3950, courses: 9, avatar: "ДВ" },
  { rank: 4, name: "Анна Петрова", points: 3640, courses: 8, avatar: "АП" },
  { rank: 5, name: "Иван Новиков", points: 3210, courses: 7, avatar: "ИН" },
  { rank: 6, name: "Вы", points: 2840, courses: 6, avatar: "ВЫ", isMe: true },
];

const shopItems = [
  { id: 1, title: "Курс «Go для бэкенда»", type: "Курс", price: 1200, coins: 600 },
  { id: 2, title: "Сертификат Pro", type: "Сертификат", price: 0, coins: 300 },
  { id: 3, title: "Тема «Тёмная+»", type: "Тема", price: 0, coins: 150 },
  { id: 4, title: "Курс «Kubernetes»", type: "Курс", price: 2400, coins: 1200 },
  { id: 5, title: "Менторская сессия", type: "Сессия", price: 3500, coins: 0 },
  { id: 6, title: "Курс «GraphQL»", type: "Курс", price: 900, coins: 450 },
];

const docs = [
  { section: "Начало работы", items: ["Регистрация и вход", "Настройка профиля", "Как проходить курсы"] },
  { section: "Обучение", items: ["Структура курсов", "Тесты и задания", "Получение сертификатов"] },
  { section: "Сертификаты", items: ["Как скачать сертификат", "Верификация сертификата", "Срок действия"] },
  { section: "Магазин", items: ["Монеты и баллы", "Покупка курсов", "Возврат средств"] },
];

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const completedCourses = courses.filter(c => c.completed);
  const inProgressCourses = courses.filter(c => c.progress > 0 && !c.completed);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-56 bg-card border-r border-border flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}>
        <div className="px-4 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-foreground flex items-center justify-center">
              <span className="text-background text-xs font-semibold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>LH</span>
            </div>
            <span className="text-sm font-semibold tracking-tight">LearnHub</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setSidebarOpen(false); }}
              className={`nav-item w-full text-left ${active === item.id ? "active" : "text-muted-foreground"}`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-accent-foreground">
              ВЫ
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">Вы</p>
              <p className="text-xs text-muted-foreground">2840 монет</p>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-background/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 border-b border-border bg-card flex items-center px-6 gap-4 sticky top-0 z-20">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Icon name="Menu" size={20} />
          </button>
          <h1 className="text-sm font-medium text-muted-foreground flex-1">
            {navItems.find(n => n.id === active)?.label}
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-md" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <Icon name="Coins" size={13} />
              2840
            </div>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-accent-foreground">
              ВЫ
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">

          {/* HOME */}
          {active === "home" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Курсов пройдено", value: "2", icon: "CheckCircle", color: "text-accent" },
                  { label: "В процессе", value: "2", icon: "Clock", color: "text-muted-foreground" },
                  { label: "Сертификатов", value: "2", icon: "Award", color: "text-accent" },
                  { label: "Место в рейтинге", value: "#6", icon: "Trophy", color: "text-muted-foreground" },
                ].map((s, i) => (
                  <div key={i} className="stat-card animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className={`${s.color} mb-3`}><Icon name={s.icon} size={18} /></div>
                    <p className="text-2xl font-semibold">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Продолжить обучение</h2>
                <div className="space-y-2">
                  {inProgressCourses.map((c, i) => (
                    <div key={c.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4 hover:border-foreground/20 transition-colors cursor-pointer animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center flex-shrink-0">
                        <Icon name="BookOpen" size={16} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{c.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{c.category} · {c.lessons} уроков</p>
                        <div className="progress-bar mt-2">
                          <div className="progress-fill" style={{ width: `${c.progress}%` }} />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{c.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Мои сертификаты</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {completedCourses.map((c, i) => (
                    <div key={c.id} className="bg-card border border-border rounded-lg p-5 relative overflow-hidden animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="absolute top-0 right-0 w-24 h-24 flex items-center justify-center opacity-[0.04] pointer-events-none">
                        <Icon name="Award" size={80} />
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Badge variant="secondary" className="text-xs mb-2">Сертификат</Badge>
                          <p className="text-sm font-medium">{c.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{c.category} · {c.duration}</p>
                        </div>
                        <button className="flex items-center gap-1.5 text-xs bg-foreground text-background px-3 py-1.5 rounded-md hover:opacity-80 transition-opacity flex-shrink-0 whitespace-nowrap">
                          <Icon name="Download" size={12} />
                          Скачать
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PROFILE */}
          {active === "profile" && (
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-xl font-semibold text-accent-foreground flex-shrink-0">
                    ВЫ
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">Ваше имя</h2>
                    <p className="text-sm text-muted-foreground">student@example.com</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs bg-secondary px-2.5 py-1 rounded-md">6 место в рейтинге</span>
                      <span className="text-xs bg-secondary px-2.5 py-1 rounded-md">2840 монет</span>
                      <span className="text-xs text-accent px-2.5 py-1 rounded-md border border-accent/30">2 сертификата</span>
                    </div>
                  </div>
                  <button className="text-xs border border-border px-3 py-1.5 rounded-md hover:bg-secondary transition-colors">
                    Редактировать
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Дней подряд", value: "14" },
                  { label: "Часов обучения", value: "38" },
                  { label: "Уроков завершено", value: "74" },
                ].map((s, i) => (
                  <div key={i} className="stat-card text-center animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <p className="text-3xl font-semibold">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Мои сертификаты</h3>
                <div className="space-y-2">
                  {completedCourses.map(c => (
                    <div key={c.id} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center">
                          <Icon name="Award" size={14} className="text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{c.title}</p>
                          <p className="text-xs text-muted-foreground">{c.category}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-1.5 text-xs text-accent hover:underline whitespace-nowrap">
                        <Icon name="Download" size={12} />
                        Скачать PDF
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Настройки</h3>
                <div className="bg-card border border-border rounded-lg divide-y divide-border">
                  {["Уведомления по email", "Ночной режим", "Язык интерфейса"].map((s, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 text-sm">
                      <span>{s}</span>
                      <button className="text-xs border border-border px-2.5 py-1 rounded hover:bg-secondary transition-colors">
                        Изменить
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* COURSES */}
          {active === "courses" && (
            <div className="max-w-4xl mx-auto space-y-5 animate-fade-in">
              <div className="flex gap-2 flex-wrap">
                {["Все", "В процессе", "Завершены", "Не начаты"].map((f, i) => (
                  <button key={i} className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${i === 0 ? "bg-foreground text-background border-foreground" : "border-border hover:bg-secondary text-muted-foreground"}`}>
                    {f}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((c, i) => (
                  <div key={c.id} className="bg-card border border-border rounded-lg overflow-hidden hover:border-foreground/30 transition-colors cursor-pointer animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                    <div className="h-28 bg-secondary flex items-center justify-center">
                      <Icon name="BookOpen" size={28} className="text-muted-foreground/30" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-medium leading-tight">{c.title}</p>
                        {c.completed && (
                          <Icon name="CheckCircle" size={15} className="text-accent flex-shrink-0 mt-0.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{c.category} · {c.duration} · {c.lessons} уроков</p>
                      <div className="progress-bar mb-2">
                        <div className="progress-fill" style={{ width: `${c.progress}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{c.progress}%</span>
                        {c.completed ? (
                          <button className="flex items-center gap-1 text-xs text-accent hover:underline">
                            <Icon name="Download" size={11} />
                            Сертификат
                          </button>
                        ) : (
                          <button className="text-xs bg-foreground text-background px-2.5 py-1 rounded hover:opacity-80 transition-opacity">
                            {c.progress > 0 ? "Продолжить" : "Начать"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DOCS */}
          {active === "docs" && (
            <div className="max-w-3xl mx-auto animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1">
                  {docs.map((section, si) => (
                    <div key={si}>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest px-2 py-2">{section.section}</p>
                      {section.items.map((item, ii) => (
                        <button
                          key={ii}
                          onClick={() => setSelectedDoc(item)}
                          className={`w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${selectedDoc === item ? "bg-foreground text-background" : "hover:bg-secondary text-muted-foreground hover:text-foreground"}`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="md:col-span-2 bg-card border border-border rounded-lg p-6 min-h-64">
                  {selectedDoc ? (
                    <div className="animate-fade-in">
                      <h2 className="text-base font-semibold mb-4">{selectedDoc}</h2>
                      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                        <p>Это раздел документации по теме <strong className="text-foreground">«{selectedDoc}»</strong>.</p>
                        <p>Здесь будет подробное описание данного раздела с примерами, шагами и полезными советами.</p>
                        <div className="bg-secondary rounded p-3 text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          # Пример шага<br />
                          $ learn --start "{selectedDoc}"
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground py-12">
                      <Icon name="FileText" size={32} className="mb-3 opacity-25" />
                      <p className="text-sm">Выберите статью слева</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* LEADERBOARD */}
          {active === "leaderboard" && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <div className="grid grid-cols-3 gap-3 mb-6">
                {leaderboard.slice(0, 3).map((u, i) => (
                  <div key={u.rank} className={`bg-card border rounded-lg p-4 text-center animate-slide-up ${i === 0 ? "border-foreground/30" : "border-border"}`} style={{ animationDelay: `${i * 60}ms` }}>
                    <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center text-sm font-semibold mb-2 ${i === 0 ? "bg-foreground text-background" : "bg-secondary text-foreground"}`}>
                      {u.avatar}
                    </div>
                    <p className="text-xs font-medium truncate">{u.name.split(" ")[0]}</p>
                    <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{u.points.toLocaleString()}</p>
                    <div className={`text-xs mt-2 w-5 h-5 rounded-full mx-auto flex items-center justify-center font-bold ${i === 0 ? "bg-yellow-100 text-yellow-700" : i === 1 ? "bg-secondary text-muted-foreground" : "bg-orange-50 text-orange-600"}`}>
                      {u.rank}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 text-xs text-muted-foreground font-medium px-4 py-3 border-b border-border bg-secondary/40">
                  <span className="col-span-1">#</span>
                  <span className="col-span-5">Имя</span>
                  <span className="col-span-3 text-right">Баллы</span>
                  <span className="col-span-3 text-right">Курсов</span>
                </div>
                {leaderboard.map((u, i) => (
                  <div
                    key={u.rank}
                    className={`grid grid-cols-12 items-center px-4 py-3 text-sm border-b border-border last:border-0 animate-slide-up transition-colors ${u.isMe ? "bg-accent/8" : "hover:bg-secondary/30"}`}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className={`col-span-1 text-xs ${u.rank <= 3 ? "font-bold" : "text-muted-foreground"}`} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{u.rank}</span>
                    <div className="col-span-5 flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${u.isMe ? "bg-accent text-accent-foreground" : "bg-secondary"}`}>
                        {u.avatar}
                      </div>
                      <span className={`truncate text-xs ${u.isMe ? "font-semibold text-accent" : ""}`}>{u.name}</span>
                    </div>
                    <span className="col-span-3 text-right text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{u.points.toLocaleString()}</span>
                    <span className="col-span-3 text-right text-xs text-muted-foreground">{u.courses}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SHOP */}
          {active === "shop" && (
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-muted-foreground">Ваш баланс</p>
                <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-lg">
                  <Icon name="Coins" size={15} className="text-accent" />
                  <span className="text-sm font-semibold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>2 840 монет</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shopItems.map((item, i) => (
                  <div key={item.id} className="bg-card border border-border rounded-lg p-5 hover:border-foreground/30 transition-colors cursor-pointer animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                    <Badge variant="secondary" className="text-xs mb-3">{item.type}</Badge>
                    <p className="text-sm font-medium mb-4">{item.title}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        {item.coins > 0 && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Icon name="Coins" size={11} className="text-accent" />
                            {item.coins} монет
                          </span>
                        )}
                        {item.price > 0 && (
                          <span className="text-xs text-muted-foreground">{item.price.toLocaleString()} ₽</span>
                        )}
                        {item.coins === 0 && item.price === 0 && (
                          <span className="text-xs text-accent">Бесплатно</span>
                        )}
                      </div>
                      <button className="text-xs bg-foreground text-background px-3 py-1.5 rounded-md hover:opacity-80 transition-opacity">
                        Получить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
