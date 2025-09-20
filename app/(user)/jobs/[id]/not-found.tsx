import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-foreground">Job Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">The job you're looking for doesn't exist or may have been removed.</p>
          <Link href="/">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Job Listings
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
