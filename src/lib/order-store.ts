import type { DocumentOrder } from "./types";

const globalStore = globalThis as typeof globalThis & {
  legkodokOrders?: Map<string, DocumentOrder>;
};

export const orders = globalStore.legkodokOrders ?? new Map<string, DocumentOrder>();

globalStore.legkodokOrders = orders;
