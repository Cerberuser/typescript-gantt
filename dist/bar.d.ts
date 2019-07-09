import Arrow from './arrow';
import { Gantt, ITaskInternal } from './index';
export default class Bar {
    private static prepare_helpers;
    group: SVGElement | null;
    $bar: SVGGraphicsElement | null;
    task: ITaskInternal | null;
    arrows: Arrow[] | null;
    $bar_progress: SVGElement | null;
    $handle_progress: SVGElement | null;
    private action_completed;
    private gantt;
    private invalid;
    private height;
    private x;
    private y;
    private corner_radius;
    private duration;
    private width;
    private progress_width;
    private bar_group;
    private handle_group;
    constructor(gantt: Gantt, task: ITaskInternal);
    update_bar_position({ x, width }: {
        x?: number;
        width?: number;
    }): void;
    get_progress_polygon_points(): number[];
    date_changed(): void;
    progress_changed(): void;
    set_action_completed(): void;
    private set_defaults;
    private prepare;
    private prepare_values;
    private draw;
    private draw_bar;
    private draw_progress_bar;
    private draw_label;
    private draw_resize_handles;
    private bind;
    private setup_click_event;
    private setup_hover_event;
    private show_popup;
    private compute_start_end_date;
    private compute_progress;
    private compute_x;
    private compute_y;
    private update_attr;
    private update_progressbar_position;
    private update_label_position;
    private update_handle_position;
    private update_arrow_position;
}
