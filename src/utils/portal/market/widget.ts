import {
  WidgetListResource,
  WidgetResource,
  WidgetType,
} from "@portal/market/models";

export const getWidgetsMap = (
  widgets: WidgetListResource,
): Partial<Record<WidgetType, WidgetResource>> =>
  Object.fromEntries(
    widgets.items.map((widget) => [widget.type, widget]),
  ) as Partial<Record<WidgetType, WidgetResource>>;
