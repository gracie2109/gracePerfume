import { h } from 'vue'

import {ArrowDownIcon, ArrowRightIcon,ArrowUpIcon,CircleIcon } from 'lucide-vue-next'
export const labels = [
    {
        value: 'bug',
        label: 'Bug',
    },
    {
        value: 'feature',
        label: 'Feature',
    },
    {
        value: 'documentation',
        label: 'Documentation',
    },
]

export const statuses = [
    {
        value: 'backlog',
        label: 'Backlog',
        icon: h(ArrowDownIcon),
    },
    {
        value: 'todo',
        label: 'Todo',
        icon: h(CircleIcon),
    },
    {
        value: 'in progress',
        label: 'In Progress',
        icon: h(ArrowDownIcon),
    },
    {
        value: 'done',
        label: 'Done',
        icon: h(ArrowDownIcon),
    },
    {
        value: 'canceled',
        label: 'Canceled',
        icon: h(ArrowDownIcon),
    },
]

export const priorities = [
    {
        value: 'low',
        label: 'Low',
        icon: h(ArrowDownIcon),
    },
    {
        value: 'medium',
        label: 'Medium',
        icon: h(ArrowRightIcon),
    },
    {
        value: 'high',
        label: 'High',
        icon: h(ArrowUpIcon),
    },
]