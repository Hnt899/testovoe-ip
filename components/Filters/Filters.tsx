"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./Filters.module.scss";

type TransportTab = "rail" | "air" | "bus";

type CoachType = "СВ" | "Купе" | "Плацкарт" | "Сидячий";

type AdditionalFilter =
  | "baggage-10"
  | "baggage-20"
  | "with-kids"
  | "accessible";

interface FiltersProps {
  initialTab?: TransportTab;
  onChange?: (state: {
    tab: TransportTab;
    quick: {
      hasSeats: boolean;
      lowerBerths: boolean;
      coachType: CoachType | null;
      filters: AdditionalFilter[];
    };
    dateISO: string;
  }) => void;
}

const transportTabs: Array<{ id: TransportTab; label: string }> = [
  { id: "rail", label: "Ж/Д" },
  { id: "air", label: "Авиа" },
  { id: "bus", label: "Автобусы" },
];

const coachTypes: CoachType[] = ["СВ", "Купе", "Плацкарт", "Сидячий"];

const additionalFilterOptions: Array<{
  id: AdditionalFilter;
  label: string;
}> = [
  { id: "baggage-10", label: "Багаж до 10 кг" },
  { id: "baggage-20", label: "Багаж до 20 кг" },
  { id: "with-kids", label: "С детьми (до 7 лет)" },
  { id: "accessible", label: "Инвалидные места" },
];

const calendarDays = [
  { iso: "2025-10-20", label: "20 окт, пн", price: 3990 },
  { iso: "2025-10-21", label: "21 окт, вт", price: 4150 },
  { iso: "2025-10-22", label: "22 окт, ср", price: 3890 },
  { iso: "2025-10-23", label: "23 окт, чт", price: 4100 },
  { iso: "2025-10-24", label: "24 окт, пт", price: 4320 },
  { iso: "2025-10-25", label: "25 окт, сб", price: 3860 },
  { iso: "2025-10-26", label: "26 окт, вс", price: 3710 },
  { iso: "2025-10-27", label: "27 окт, пн", price: 3990 },
  { iso: "2025-10-28", label: "28 окт, вт", price: 4520 },
  { iso: "2025-10-29", label: "29 окт, ср", price: 4390 },
  { iso: "2025-10-30", label: "30 окт, чт", price: 4050 },
  { iso: "2025-10-31", label: "31 окт, пт", price: 3980 },
  { iso: "2025-11-01", label: "1 ноя, сб", price: 3720 },
  { iso: "2025-11-02", label: "2 ноя, вс", price: 3650 },
] as const;

export function Filters({ initialTab = "rail", onChange }: FiltersProps) {
  const [activeTab, setActiveTab] = useState<TransportTab>(initialTab);
  const [quickFilters, setQuickFilters] = useState({
    hasSeats: true,
    lowerBerths: false,
    coachType: null as CoachType | null,
    filters: [] as AdditionalFilter[],
  });
  const [selectedDate, setSelectedDate] = useState<string>(calendarDays[2].iso);
  const [isCoachMenuOpen, setIsCoachMenuOpen] = useState(false);
  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false);

  useEffect(() => {
    if (!onChange) {
      return;
    }

    onChange({
      tab: activeTab,
      quick: {
        hasSeats: quickFilters.hasSeats,
        lowerBerths: quickFilters.lowerBerths,
        coachType: quickFilters.coachType,
        filters: quickFilters.filters,
      },
      dateISO: selectedDate,
    });
  }, [activeTab, onChange, quickFilters, selectedDate]);

  const quickButtons = useMemo(
    () => [
      {
        id: "filters",
        label:
          quickFilters.filters.length > 0
            ? `Фильтры (${quickFilters.filters.length})`
            : "Фильтры",
        active: quickFilters.filters.length > 0 || isFiltersMenuOpen,
        onToggle: () => {
          setIsFiltersMenuOpen((prev) => !prev);
          setIsCoachMenuOpen(false);
        },
      },
      {
        id: "hasSeats",
        label: "Есть места",
        active: quickFilters.hasSeats,
        onToggle: () => {
          setQuickFilters((prev) => ({ ...prev, hasSeats: !prev.hasSeats }));
          setIsFiltersMenuOpen(false);
          setIsCoachMenuOpen(false);
        },
      },
      {
        id: "lowerBerths",
        label: "Нижние места",
        active: quickFilters.lowerBerths,
        onToggle: () => {
          setQuickFilters((prev) => ({
            ...prev,
            lowerBerths: !prev.lowerBerths,
          }));
          setIsFiltersMenuOpen(false);
          setIsCoachMenuOpen(false);
        },
      },
      {
        id: "coachType",
        label: quickFilters.coachType ? `Тип вагона: ${quickFilters.coachType}` : "Тип вагона",
        active: Boolean(quickFilters.coachType) || isCoachMenuOpen,
        onToggle: () => {
          setIsCoachMenuOpen((prev) => !prev);
          setIsFiltersMenuOpen(false);
        },
      },
    ],
    [isCoachMenuOpen, isFiltersMenuOpen, quickFilters]
  );

  return (
    <section className={styles.filters} aria-label="Фильтры поиска рейсов">
      <div className={styles.tabs} role="tablist" aria-label="Тип транспорта">
        {transportTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={
              activeTab === tab.id
                ? `${styles.tab} ${styles.tabActive}`
                : styles.tab
            }
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.quickFilters} aria-label="Быстрые фильтры">
        {quickButtons.map((button) => (
          <button
            key={button.id}
            type="button"
            className={
              button.active
                ? `${styles.quickButton} ${styles.quickButtonActive}`
                : styles.quickButton
            }
            aria-pressed={button.active}
            onClick={button.onToggle}
          >
            {button.label}
          </button>
        ))}
      </div>

      {isFiltersMenuOpen && (
        <div className={styles.dropdownMenu} role="group" aria-label="Дополнительные фильтры">
          {additionalFilterOptions.map((option) => {
            const isActive = quickFilters.filters.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                className={
                  isActive
                    ? `${styles.dropdownOption} ${styles.dropdownOptionActive}`
                    : styles.dropdownOption
                }
                aria-pressed={isActive}
                onClick={() =>
                  setQuickFilters((prev) => ({
                    ...prev,
                    filters: isActive
                      ? prev.filters.filter((filter) => filter !== option.id)
                      : [...prev.filters, option.id],
                  }))
                }
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}

      {isCoachMenuOpen && (
        <div className={styles.dropdownMenu} role="group" aria-label="Тип вагона">
          {coachTypes.map((type) => {
            const isActive = quickFilters.coachType === type;
            return (
              <button
                key={type}
                type="button"
                className={
                  isActive
                    ? `${styles.dropdownOption} ${styles.dropdownOptionActive}`
                    : styles.dropdownOption
                }
                aria-pressed={isActive}
                onClick={() => {
                  setQuickFilters((prev) => ({
                    ...prev,
                    coachType: prev.coachType === type ? null : type,
                  }));
                  setIsCoachMenuOpen(false);
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      )}

      <div className={styles.calendar} aria-label="Календарь цен">
        {calendarDays.map((day) => {
          const isActive = selectedDate === day.iso;
          return (
            <button
              key={day.iso}
              type="button"
              className={
                isActive
                  ? `${styles.dayCard} ${styles.dayCardActive}`
                  : styles.dayCard
              }
              aria-pressed={isActive}
              onClick={() => setSelectedDate(day.iso)}
            >
              <span className={styles.dayLabel}>{day.label}</span>
              <span className={styles.dayPrice}>
                {new Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                  maximumFractionDigits: 0,
                }).format(day.price)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Filters;
