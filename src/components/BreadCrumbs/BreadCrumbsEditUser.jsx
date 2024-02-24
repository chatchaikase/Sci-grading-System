"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function BreadCrumbsEditUser() {
  const router = useRouter();
  const routerToSubjectListPage = () => {
    router.push("/admin")
  }
  return (
    <Breadcrumbs size="lg">
      <BreadcrumbItem onClick={routerToSubjectListPage}>Admin</BreadcrumbItem>
      <BreadcrumbItem onClick={routerToSubjectListPage}>จัดการผู้ใช้งาน</BreadcrumbItem>
      <BreadcrumbItem>เเก้ไขผู้ใช้งาน</BreadcrumbItem>
    </Breadcrumbs>
  );
}
