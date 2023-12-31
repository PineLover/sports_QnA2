"use client";
import AddSports from "@/components/Sports/AddSports";
import SportsSection from "@/components/SportsSection";
import { Prisma } from "@prisma/client";

export type Sports = Prisma.SportsGetPayload<{
    include: {
        _count: {
            select: {
                Post: true;
            };
        };
    };
}>;

export default function SportsPage() {
    return (
        <div className="p-8">
            <SportsSection />
            <AddSports />
        </div>
    );
}
