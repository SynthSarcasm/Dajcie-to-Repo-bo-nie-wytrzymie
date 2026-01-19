# VoxPro - Notatki Głosowe AI

Aplikacja została zaprojektowana z myślą o maksymalnej wydajności przy minimalnych kosztach.

## 🌐 Dostęp Online

Aplikacja jest dostępna pod adresem: **https://synthsarcasm.github.io/Dajcie-to-Repo-bo-nie-wytrzymie/**

Możesz udostępnić ten link komukolwiek, aby mógł od razu korzystać z aplikacji w przeglądarce.

### Automatyczne wdrożenie

Aplikacja jest automatycznie wdrażana na GitHub Pages po każdym pushu do gałęzi `main`. Konfiguracja wdrożenia znajduje się w pliku `.github/workflows/deploy.yml`.

### Jak włączyć GitHub Pages (dla administratorów repozytorium)

Aby aplikacja była dostępna publicznie, należy włączyć GitHub Pages w ustawieniach repozytorium:

1. Przejdź do repozytorium na GitHub
2. Kliknij **Settings** (Ustawienia)
3. W menu bocznym wybierz **Pages**
4. W sekcji **Source** wybierz **GitHub Actions**
5. Po zmergowaniu zmian do gałęzi `main`, workflow automatycznie zbuduje i wdroży aplikację
6. Po zakończeniu wdrożenia, link będzie dostępny pod adresem: `https://[username].github.io/[repo-name]/`

### Konfiguracja API Key

Aby korzystać z funkcji AI (transkrypcja, automatyczne tytuły), użytkownicy muszą:
1. Uzyskać darmowy klucz API z [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Wprowadzić klucz w ustawieniach aplikacji (ikona koła zębatego)

## Wykorzystanie AI
Wszystkie funkcje inteligentne w aplikacji (transkrypcja, automatyczne tytuły, podsumowania, ekstrakcja zadań) korzystają z modelu:
**`gemini-flash-lite-latest`**

### Dlaczego ten model?
1. **Absolutnie najniższe koszty**: Jest to model typu "Lite", zoptymalizowany pod kątem ekonomii i lekkości przy zachowaniu wysokiej jakości transkrypcji.
2. **Największy darmowy limit**: Modele Lite oferują zazwyczaj najszerszy zakres darmowych zapytań w ramach Google AI Studio (Free Tier), co czyni aplikację dostępną dla każdego.
3. **Ekstremalna szybkość**: Przetwarzanie danych odbywa się błyskawicznie, co jest kluczowe dla komfortu pracy z głosem.
