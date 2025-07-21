# Client Manager

## Demo

### GitHub

Repository URL: https://github.com/lmar13/clients-manager

### Hosting

Remote URL -> [cmanager.lmarciniak.xyz](https://cmanager.lmarciniak.xyz/) -> hosted app on netlify and redirected to my subdomain

## Local version

### Install deps

Before running app locally, You should install dependencies:

```bash
npm install
```

### Development environment

To start a local version of app, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`

### Testing locally

To run test locally, run:

```bash
npm run test
```

## TODO List

## ✅ Cel

Stwórz prostą aplikację w Angularze składającą się z dwóch głównych widoków:

- [ ] **Strona główna** – wyświetla tabelę z danymi klientów.
- [ ] **Strona dodawania danych** – umożliwia dodanie nowego klienta w formie wieloetapowego formularza.

---

## ✅ Struktura aplikacji

### Strona główna

- [ ] Wyświetla listę klientów w formie tabeli (użyj Angular Material Table).
- [ ] Dane mogą być przechowywane i pobierane w pamięci przeglądarki lub API (jak masz czas).
- [ ] Tabela powinna umożliwiać:
  - [ ] sortowanie,
  - [ ] filtrowanie

### Strona dodawania danych

- [ ] Formularz podzielony na 3 kroki z możliwością:
  - [ ] przechodzenia do kolejnych kroków,
  - [ ] wracania do poprzednich kroków.
- [ ] Wykorzystaj Angular Material Stepper (MatStepper) oraz NgRx.
- [ ] Dane z poszczególnych kroków powinny być przechowywane w formularzu (Reactive Forms).

---

## ✅ Kroki formularza

### Krok 1: Dane podstawowe

- [ ] Imię (pole wymagane)
- [ ] Nazwisko (pole wymagane)
- [ ] Numer telefonu (pole wymagane, walidacja na numer telefonu)

### Krok 2: Zainteresowania

- [ ] Dynamiczna lista zainteresowań (możliwość dodawania/usuwania pól).

### Krok 3: Podsumowanie

- [ ] Wyświetlenie wszystkich wprowadzonych danych w formie podsumowania.
- [ ] Przycisk „Zapisz” zapisuje dane do: NgRx Store oraz/lub localStorage.

---

## ✅ Technologie i wymagania

- [ ] Angular (ostatnia stabilna wersja)
- [ ] Angular Material (UI komponenty + MatStepper)
- [ ] Reactive Forms (walidacje, dynamiczne pola)
- [ ] NgRx (zarządzanie stanem aplikacji – lista klientów)
- [ ] Angular Router (nawigacja między stronami)

