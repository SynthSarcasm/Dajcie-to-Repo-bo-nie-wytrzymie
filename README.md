# VoxPro - Notatki Głosowe AI

Aplikacja została zaprojektowana z myślą o maksymalnej wydajności przy minimalnych kosztach.

## 🌐 Dostęp Online

Aplikacja jest dostępna pod adresem: **https://synthsarcasm.github.io/Dajcie-to-Repo-bo-nie-wytrzymie/**

Możesz udostępnić ten link komukolwiek, aby mógł od razu korzystać z aplikacji w przeglądarce.

### Automatyczne wdrożenie

Aplikacja jest automatycznie wdrażana na GitHub Pages po każdym pushu do gałęzi `main`. Konfiguracja wdrożenia znajduje się w pliku `.github/workflows/deploy.yml`.

## Wykorzystanie AI
Wszystkie funkcje inteligentne w aplikacji (transkrypcja, automatyczne tytuły, podsumowania, ekstrakcja zadań) korzystają z modelu:
**`gemini-flash-lite-latest`**

### Dlaczego ten model?
1. **Absolutnie najniższe koszty**: Jest to model typu "Lite", zoptymalizowany pod kątem ekonomii i lekkości przy zachowaniu wysokiej jakości transkrypcji.
2. **Największy darmowy limit**: Modele Lite oferują zazwyczaj najszerszy zakres darmowych zapytań w ramach Google AI Studio (Free Tier), co czyni aplikację dostępną dla każdego.
3. **Ekstremalna szybkość**: Przetwarzanie danych odbywa się błyskawicznie, co jest kluczowe dla komfortu pracy z głosem.
