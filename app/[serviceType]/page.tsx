import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, MapPin, Clock, ArrowRight, Filter } from "lucide-react";
import {
  isValidServiceType,
  getServiceTypeConfig,
} from "@/config/service-types";
import { getEstablishmentsByType } from "@/data/mock-db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface ServiceTypePageProps {
  params: {
    serviceType: string;
  };
}

export default async function ServiceTypePage({
  params,
}: ServiceTypePageProps) {
  const resolvedParams = await params;
  const serviceType = resolvedParams.serviceType;

  if (!isValidServiceType(serviceType)) {
    notFound();
  }

  const config = getServiceTypeConfig(serviceType);
  const establishments = getEstablishmentsByType(serviceType);

  if (!config) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="relative py-16 md:py-24"
        style={{
          background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="container-custom relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {config.label}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              {config.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {config.features.map((feature, index) => (
                <Badge key={index} className="bg-white/20 text-white border-0">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {establishments.length} estabelecimento
                {establishments.length !== 1 ? "s" : ""} encontrado
                {establishments.length !== 1 ? "s" : ""}
              </h2>
              <p className="text-gray-600 mt-1">Escolha o melhor para você</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
          </div>

          {/* Grid */}
          {establishments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {establishments.map((establishment) => (
                <Link
                  key={establishment.id}
                  href={`/${serviceType}/${establishment.slug}`}
                >
                  <Card hover className="h-full overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={
                          establishment.images.hero ||
                          establishment.images.cover ||
                          ""
                        }
                        alt={establishment.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge
                          className="text-white"
                          style={{ backgroundColor: config.primaryColor }}
                        >
                          {establishment.rating}
                          <Star className="w-3 h-3 ml-1 fill-white" />
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {establishment.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {establishment.shortDescription}
                      </p>

                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {establishment.address.city},{" "}
                          {establishment.address.state}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {establishment.bookingSettings.businessHours.find(
                            (h) => h.dayOfWeek === new Date().getDay(),
                          )?.isOpen
                            ? "Aberto agora"
                            : "Fechado"}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {establishment.reviewCount} avaliações
                        </div>
                        <div
                          className="text-sm font-medium flex items-center"
                          style={{ color: config.primaryColor }}
                        >
                          Ver detalhes
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum estabelecimento encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                Ainda não temos estabelecimentos nesta categoria.
              </p>
              <Link href="/">
                <Button>Ver outras categorias</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
