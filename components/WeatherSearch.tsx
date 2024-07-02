"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  fetchWeatherByCity,
  fetchWeatherByGeolocation,
} from "@/store/weatherThunk";
import { useAppDispatch } from "@/store/store";
import { Form, FormControl, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { defaultValuesSearchForm, searchForm } from "@/constants";
import { IconRefresh, IconSearch } from "@tabler/icons-react";
import { useAppSelector } from "@/hooks/hooks";

const WeatherSearch = ({ error }: { error?: string }) => {
  const errorResp = useAppSelector((state) => state.user.error);
  const initialValues = defaultValuesSearchForm;

  const form = useForm<z.infer<typeof searchForm>>({
    resolver: zodResolver(searchForm),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (errorResp) {
      form.setError("city", {
        type: "manual",
        message: errorResp,
      });
    }
  }, [errorResp, form]);

  const dispatch = useAppDispatch();

  const onSubmit = (data: z.infer<typeof searchForm>) => {
    dispatch(fetchWeatherByCity(data.city));
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchWeatherByGeolocation({ latitude, longitude }));
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div
      className={`${
        error
          ? "h-lvh flex items-center justify-center bg-cyan-500"
          : "mr-6 mb-6 lg:mb-0"
      } `}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-1">
          <FormItem className="relative space-y-0">
            {form.formState.errors.city && (
              <FormMessage className="absolute bottom-0 left-0 translate-y-full">
                {form.formState.errors.city.message}
              </FormMessage>
            )}
            <FormControl>
              <Input
                className="input-field md:min-w-60"
                id="city"
                {...form.register("city")}
                placeholder="Enter city name"
              />
            </FormControl>
          </FormItem>
          <Button type="submit">
            <IconSearch />
          </Button>
          <Button type="button" onClick={handleCurrentLocation}>
            <IconRefresh />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default WeatherSearch;
