# Instrukcje Wdrożenia

## Konfiguracja GitHub Pages

### Krok 1: Włącz GitHub Pages

1. Przejdź do repozytorium na GitHub: `https://github.com/SynthSarcasm/Dajcie-to-Repo-bo-nie-wytrzymie`
2. Kliknij na zakładkę **Settings** (Ustawienia)
3. W menu bocznym znajdź i kliknij **Pages**
4. W sekcji **Build and deployment**:
   - **Source**: Wybierz **GitHub Actions**

### Krok 2: Uruchom Workflow

Po zmergowaniu zmian do gałęzi `main`:

1. Przejdź do zakładki **Actions** w repozytorium
2. Workflow "Deploy to GitHub Pages" zostanie automatycznie uruchomiony
3. Możesz również uruchomić go ręcznie:
   - Kliknij na workflow "Deploy to GitHub Pages"
   - Kliknij przycisk **Run workflow**
   - Wybierz gałąź `main`
   - Kliknij **Run workflow**

### Krok 3: Sprawdź Deployment

1. Workflow powinien zakończyć się sukcesem (zielony znacznik ✓)
2. W zakładce **Settings > Pages** zobaczysz aktywny link do aplikacji
3. Link będzie w formacie: `https://synthsarcasm.github.io/Dajcie-to-Repo-bo-nie-wytrzymie/`

## Udostępnianie Aplikacji

Po pomyślnym wdrożeniu:

1. **Link do aplikacji**: `https://synthsarcasm.github.io/Dajcie-to-Repo-bo-nie-wytrzymie/`
2. Ten link możesz udostępnić dowolnej osobie
3. Aplikacja działa w przeglądarce bez potrzeby instalacji
4. Użytkownicy muszą mieć własny klucz API Google Gemini, aby korzystać z funkcji AI

## Konfiguracja dla Użytkowników

### Uzyskanie Klucza API

1. Przejdź do [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Zaloguj się kontem Google
3. Kliknij **Create API Key**
4. Skopiuj wygenerowany klucz

### Wprowadzenie Klucza w Aplikacji

1. Otwórz aplikację w przeglądarce
2. Kliknij ikonę koła zębatego (⚙️) w prawym górnym rogu
3. Wklej klucz API w pole **Gemini API Key**
4. Kliknij **Zapisz**

Teraz możesz korzystać ze wszystkich funkcji aplikacji!

## Aktualizacje

Każdy push do gałęzi `main` automatycznie aktualizuje aplikację na GitHub Pages. Proces trwa około 1-2 minuty.

## Troubleshooting

### Workflow się nie uruchamia

- Sprawdź, czy w repozytorium są włączone GitHub Actions
- W **Settings > Actions > General** upewnij się, że Actions są dozwolone

### Błąd 404 po deployment

- Upewnij się, że w **Settings > Pages** źródło jest ustawione na **GitHub Actions**
- Sprawdź, czy workflow zakończył się sukcesem
- Odczekaj kilka minut - czasami propagacja zmian trwa chwilę

### Aplikacja nie ładuje się poprawnie

- Wyczyść cache przeglądarki
- Sprawdź konsolę przeglądarki (F12) pod kątem błędów
- Upewnij się, że ścieżki w `vite.config.ts` są poprawne

## Alternatywne Metody Wdrożenia

Jeśli GitHub Pages nie działa, możesz wdrożyć aplikację na:

- **Vercel**: Import projektu z GitHub, automatyczne wdrożenie
- **Netlify**: Przeciągnij i upuść folder `dist` lub połącz z GitHub
- **Cloudflare Pages**: Import z GitHub, darmowy hosting

W każdym przypadku musisz:
1. Uruchomić `npm run build`
2. Wdrożyć zawartość folderu `dist`
